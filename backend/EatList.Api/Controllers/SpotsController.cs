using Microsoft.AspNetCore.Mvc;
using EatList.Api.Services;
using EatList.Api.DTOs.Request;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace EatList.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class SpotsController : ControllerBase
{
    private readonly ISpotService _spotService;

    public SpotsController(ISpotService spotService)
    {
        _spotService = spotService;
    }

    [HttpGet]
    public async Task<IActionResult> GetSpots()
    {
        var boardId = int.Parse(User.FindFirstValue("BoardId")!);
        var spots = await _spotService.GetSpotsAsync(boardId);
        return Ok(spots);
    }

    [HttpGet("{spotId}")]
    public async Task<IActionResult> GetSpot(Guid spotId)
    {
        var boardId = int.Parse(User.FindFirstValue("BoardId")!);
        var spot = await _spotService.GetSpotByIdAsync(boardId, spotId);
        return Ok(spot);
    }

    [HttpPost]
    public async Task<IActionResult> CreateSpot([FromBody] CreateSpotDto dto)
    {
        var boardId = int.Parse(User.FindFirstValue("BoardId")!);
        var spot = await _spotService.CreateSpotAsync(boardId, dto);
        return CreatedAtAction(nameof(GetSpot), new { spotId = spot.Id }, spot);
    }


    [HttpPut("{spotId}")]
    public async Task<IActionResult> UpdateSpot(Guid spotId, [FromBody] UpdateSpotDto dto)
    {
        var boardId = int.Parse(User.FindFirstValue("BoardId")!);
        var spot = await _spotService.UpdateSpotAsync(boardId, spotId, dto);
        return Ok(spot);
    }

    [HttpDelete("{spotId}")]
    public async Task<IActionResult> DeleteSpot(Guid spotId)
    {
        var boardId = int.Parse(User.FindFirstValue("BoardId")!);
        await _spotService.DeleteSpotAsync(boardId, spotId);
        return NoContent();
    }
}