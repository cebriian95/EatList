using EatList.Api.DTOs.Request;
using EatList.Api.DTOs.Response;

namespace EatList.Api.Services;

public interface IRatingService
{
    Task<RatingResponseDto> CreateRatingAsync(int boardId, Guid spotId, CreateRatingDto dto);
    Task DeleteRatingAsync(int boardId, Guid ratingId);
}
