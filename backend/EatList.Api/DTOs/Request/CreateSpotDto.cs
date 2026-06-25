namespace EatList.Api.DTOs.Request;

public class CreateSpotDto
{
    public required string Title { get; set; }
    public  string? Location { get; set; }
    public  string? LocationMap { get; set; }
    
}