using System.ComponentModel.DataAnnotations;
using EatList.Api.Models;

namespace EatList.Api.DTOs.Request;

public class CreateSpotDto
{
    [Required, StringLength(100)]
    public required string Title { get; set; }

    public SpotStatus? Status { get; set; }

    public string? Location { get; set; }

    public string? LocationMap { get; set; }
}