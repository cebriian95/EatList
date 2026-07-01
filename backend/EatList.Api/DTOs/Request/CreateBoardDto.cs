using System.ComponentModel.DataAnnotations;

namespace EatList.Api.DTOs.Request;
public class CreateBoardDto
{
    [Required, StringLength(50, MinimumLength = 3)]
    public required string Name { get; set; }

    [Required, StringLength(100, MinimumLength = 3)]
    public required string Password { get; set; }
}