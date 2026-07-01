using System.ComponentModel.DataAnnotations;

namespace EatList.Api.DTOs.Request;

public class CreateRatingDto
{
    [Required, StringLength(20)]
    public required string Nickname { get; set; }

    [Required, Range(0, 10)]
    public required int Score { get; set; }
}