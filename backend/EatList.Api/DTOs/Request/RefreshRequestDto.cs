using System.ComponentModel.DataAnnotations;

namespace EatList.Api.DTOs.Request;

public class RefreshRequestDto
{
    [Required]
    public required string RefreshToken { get; set; }
}
