using Microsoft.EntityFrameworkCore;
using EatList.Api.DTOs.Request;
using EatList.Api.DTOs.Response;
using EatList.Api.Data;
using EatList.Api.Models;

namespace EatList.Api.Services;

public class SpotService : ISpotService
{
    private readonly AppDbContext _db;

    public SpotService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<SpotResponseDto>> GetSpotsAsync(int boardId)
    {
        var spots = await _db.Spots
            .Where(s => s.BoardId == boardId)
            .OrderBy(s => s.CreatedAt)
            .ToListAsync();

        return spots.Select(MapToResponse).ToList();
    }

    public async Task<SpotResponseDto> CreateSpotAsync(int boardId, CreateSpotDto dto)
    {
        var spot = new Spot
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Location = dto.Location ?? string.Empty,
            LocationMap = dto.LocationMap ?? string.Empty,
            Status = SpotStatus.Pendiente,
            BoardId = boardId,
            CreatedAt = DateTime.Now
        };

        _db.Spots.Add(spot);
        await _db.SaveChangesAsync();

        return MapToResponse(spot);
    }

    public async Task<SpotResponseDto> UpdateSpotAsync(int boardId, Guid spotId, UpdateSpotDto dto)
    {
        var spot = await _db.Spots.FindAsync(spotId);

        if (spot is null || spot.BoardId != boardId)
            throw new KeyNotFoundException("Spot not found");

        spot.Title = dto.Title ?? spot.Title;
        spot.Location = dto.Location ?? spot.Location;
        spot.LocationMap = dto.LocationMap ?? spot.LocationMap;
        spot.Status = dto.Status ?? spot.Status;

        await _db.SaveChangesAsync();

        return MapToResponse(spot);
    }

    public async Task DeleteSpotAsync(int boardId, Guid spotId)
    {
        var spot = await _db.Spots.FindAsync(spotId);

        if (spot is null || spot.BoardId != boardId)
            throw new KeyNotFoundException("Spot not found");

        _db.Spots.Remove(spot);
        await _db.SaveChangesAsync();
    }

    private static SpotResponseDto MapToResponse(Spot spot)
    {
        return new SpotResponseDto
        {
            Id = spot.Id,
            Title = spot.Title,
            Location = spot.Location,
            LocationMap = spot.LocationMap,
            Status = spot.Status,
            BoardId = spot.BoardId,
            CreatedAt = spot.CreatedAt
        };
    }
}
