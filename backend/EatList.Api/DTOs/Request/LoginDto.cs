using System.ComponentModel.DataAnnotations;

namespace EatList.Api.DTOs.Request;

public class LoginDto
{
    [Required, Range(1, int.MaxValue)]
    public required int BoardId { get; set; }

    [Required]
    public required string Password { get; set; }
}