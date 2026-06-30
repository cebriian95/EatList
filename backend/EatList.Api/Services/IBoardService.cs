using EatList.Api.DTOs.Request;
using EatList.Api.DTOs.Response;

namespace EatList.Api.Services;

public interface IBoardService
{
    Task<LoginResponseDto> CreateBoardAsync(CreateBoardDto dto);
    Task<LoginResponseDto> LoginAsync(LoginDto dto);
    Task<LoginResponseDto> RefreshTokenAsync(RefreshRequestDto request);
    Task ChangePasswordAsync(int boardId, ChangeBoardPassDto dto);
}
