using EatList.Api.Services;
using Microsoft.AspNetCore.Mvc;
using EatList.Api.DTOs.Request;
using EatList.Api.DTOs.Response;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace EatList.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BoardsController : ControllerBase
{
    private readonly IBoardService _boardService;

    public BoardsController(IBoardService boardService)
    {
        _boardService = boardService;
    }
    
    //crea nueva board y loguea al usuario
    [HttpPost]
    public async Task<IActionResult> CreateBoard([FromBody] CreateBoardDto dto)
    {
        var loginResponse = await _boardService.CreateBoardAsync(dto);
        return Ok(loginResponse);
    }

    [Authorize]
    [HttpPatch("password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangeBoardPassDto dto)
    {
        
        await _boardService.ChangePasswordAsync(int.Parse(User.FindFirstValue("BoardId")!), dto);
        return NoContent();
    }
}