using EatList.Api.Models;

namespace EatList.Api.DTOs.Response;

public class SpotResponseDto
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public  string Location { get; set; } = string.Empty;
    public  string LocationMap { get; set; } = string.Empty;
    public SpotStatus Status { get; set; }
    public int BoardId { get; set; }
    public DateTime CreatedAt { get; set; }
}