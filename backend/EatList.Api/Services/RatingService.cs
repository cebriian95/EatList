using Microsoft.EntityFrameworkCore;
using EatList.Api.DTOs.Request;
using EatList.Api.DTOs.Response;
using EatList.Api.Data;
using EatList.Api.Models;

namespace EatList.Api.Services;

public class RatingService : IRatingService
{
    private readonly AppDbContext _db;

    public RatingService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<RatingResponseDto> CreateRatingAsync(int boardId, Guid spotId, CreateRatingDto dto)
    {
        var spot = await _db.Spots.FindAsync(spotId);

        if (spot is null || spot.BoardId != boardId)
            throw new KeyNotFoundException("Spot not found");

        var nicknameExists = await _db.Ratings
            .AnyAsync(r => r.SpotId == spotId && r.Nickname == dto.Nickname);

        if (nicknameExists)
            throw new InvalidOperationException("Nickname already exists in this spot");

        var rating = new Rating
        {
            Id = Guid.NewGuid(),
            SpotId = spotId,
            Nickname = dto.Nickname,
            Score = dto.Score,
            CreatedAt = DateTime.Now
        };

        _db.Ratings.Add(rating);
        await _db.SaveChangesAsync();

        return MapToResponse(rating);
    }

    public async Task DeleteRatingAsync(int boardId, Guid ratingId)
    {
        var rating = await _db.Ratings
            .Include(r => r.Spot)
            .FirstOrDefaultAsync(r => r.Id == ratingId);

        if (rating is null || rating.Spot is null || rating.Spot.BoardId != boardId)
            throw new KeyNotFoundException("Rating not found");

        _db.Ratings.Remove(rating);
        await _db.SaveChangesAsync();
    }

    private static RatingResponseDto MapToResponse(Rating rating)
    {
        return new RatingResponseDto
        {
            Id = rating.Id,
            SpotId = rating.SpotId,
            Nickname = rating.Nickname,
            Score = rating.Score,
            CreatedAt = rating.CreatedAt
        };
    }
}
