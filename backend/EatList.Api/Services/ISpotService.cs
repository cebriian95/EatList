using EatList.Api.DTOs.Request;
using EatList.Api.DTOs.Response;

namespace EatList.Api.Services;

public interface ISpotService
{
    Task<List<SpotResponseDto>> GetSpotsAsync(int boardId);
    Task<SpotResponseDto> CreateSpotAsync(int boardId, CreateSpotDto dto);
    Task<SpotResponseDto> UpdateSpotAsync(int boardId, Guid spotId, UpdateSpotDto dto);
    Task DeleteSpotAsync(int boardId, Guid spotId);
}
