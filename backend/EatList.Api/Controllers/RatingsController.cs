using Microsoft.AspNetCore.Mvc;
using EatList.Api.Services;
using EatList.Api.DTOs.Request;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace EatList.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class RatingsController : ControllerBase
{
    private readonly IRatingService _ratingService;

    public RatingsController(IRatingService ratingService)
    {
        _ratingService = ratingService;
    }

    [HttpPost("{spotId}")]
    public async Task<IActionResult> CreateRating(Guid spotId, [FromBody] CreateRatingDto dto)
    {
        var boardId = int.Parse(User.FindFirstValue("BoardId")!);
        var rating = await _ratingService.CreateRatingAsync(boardId, spotId, dto);
        return CreatedAtAction(nameof(CreateRating), new { spotId }, rating);
    }

    [HttpDelete("{ratingId}")]
    public async Task<IActionResult> DeleteRating(Guid ratingId)
    {
        var boardId = int.Parse(User.FindFirstValue("BoardId")!);
        await _ratingService.DeleteRatingAsync(boardId, ratingId);
        return NoContent();
    }
}
