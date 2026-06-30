using Microsoft.AspNetCore.Mvc;
using EatList.Api.Services;
using EatList.Api.DTOs.Request; 


namespace EatList.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IBoardService _boardService;

    public AuthController(IBoardService boardService)
    {
        _boardService = boardService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var response = await _boardService.LoginAsync(dto);
        return Ok(response);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshRequestDto request)
    {
        var response = await _boardService.RefreshTokenAsync(request);
        return Ok(response);
    }
}