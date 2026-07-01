using System.ComponentModel.DataAnnotations;
using EatList.Api.Models;

namespace EatList.Api.DTOs.Request;

public class UpdateSpotDto
{
    [StringLength(100)]
    public string? Title { get; set; }

    public string? Location { get; set; }

    public string? LocationMap { get; set; }

    public SpotStatus? Status { get; set; }
}