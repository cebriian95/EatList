using Microsoft.EntityFrameworkCore;
using EatList.Api.Data;
using EatList.Api.Models;
using EatList.Api.DTOs.Request;
using EatList.Api.DTOs.Response;
using System.Security.Claims;

namespace EatList.Api.Services;

public class BoardService : IBoardService
{
    private readonly AppDbContext _db;
    private readonly IJwtService _jwt;

    public BoardService(AppDbContext db, IJwtService jwt)
    {
        _db = db;
        _jwt = jwt;
    }

    public async Task<LoginResponseDto> CreateBoardAsync(CreateBoardDto dto)
    {
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var board = new Board
        {
            Name = dto.Name,
            Password = passwordHash
        };

        _db.Boards.Add(board);
        await _db.SaveChangesAsync();

        return await GenerateLoginResponseAsync(board);
    }

    public async Task<LoginResponseDto> LoginAsync(LoginDto dto)
    {
        var board = await _db.Boards.FindAsync(dto.BoardId);

        if (board is null || !BCrypt.Net.BCrypt.Verify(dto.Password, board.Password))
        {
            throw new UnauthorizedAccessException("Credenciales incorrectas");
        }

        return await GenerateLoginResponseAsync(board);
    }

    public async Task<LoginResponseDto> RefreshTokenAsync(RefreshRequestDto request)
    {
        var activeTokens = await _db.RefreshTokens
            .Where(rt => rt.RevokedAt == null && rt.ExpiresAt > DateTime.Now)
            .ToListAsync();

        var matchedToken = activeTokens.FirstOrDefault(rt =>
            BCrypt.Net.BCrypt.Verify(request.RefreshToken, rt.Token));

        if (matchedToken is null)
        {
            throw new UnauthorizedAccessException("Refresh token inválido o expirado");
        }

        matchedToken.RevokedAt = DateTime.Now;

        var board = await _db.Boards.FindAsync(matchedToken.BoardId)
            ?? throw new UnauthorizedAccessException("Sala no encontrada");

        await _db.SaveChangesAsync();

        return await GenerateLoginResponseAsync(board);
    }

    public async Task ChangePasswordAsync(int boardId, ChangeBoardPassDto dto)
    {
        var board = await _db.Boards.FindAsync(boardId)
            ?? throw new KeyNotFoundException("Sala no encontrada");

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, board.Password))
        {
            throw new UnauthorizedAccessException("Contraseña actual incorrecta");
        }

        board.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

        var activeTokens = await _db.RefreshTokens
            .Where(rt => rt.BoardId == boardId && rt.RevokedAt == null)
            .ToListAsync();

        foreach (var token in activeTokens)
        {
            token.RevokedAt = DateTime.Now;
        }

        await _db.SaveChangesAsync();
    }

    private async Task<LoginResponseDto> GenerateLoginResponseAsync(Board board)
    {
        var claims = new[] { new Claim("BoardId", board.Id.ToString()) };
        var token = _jwt.GenerateToken(claims);

        var refreshTokenString = _jwt.GenerateRefreshToken();
        var refreshTokenHash = BCrypt.Net.BCrypt.HashPassword(refreshTokenString);

        var refreshToken = new RefreshToken
        {
            Token = refreshTokenHash,
            BoardId = board.Id,
            CreatedAt = DateTime.Now,
            ExpiresAt = DateTime.Now.AddDays(30)
        };

        _db.RefreshTokens.Add(refreshToken);
        await _db.SaveChangesAsync();

        return new LoginResponseDto
        {
            Token = token,
            RefreshToken = refreshTokenString,
            Board = new BoardResponseDto
            {
                Id = board.Id,
                Name = board.Name,
                Password = board.Password,
                CreatedAt = board.CreatedAt
            }
        };
    }
}
