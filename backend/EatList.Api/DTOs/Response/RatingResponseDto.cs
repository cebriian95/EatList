namespace EatList.Api.DTOs.Response;

public class RatingResponseDto
{
    public Guid Id { get; set; }
    public Guid SpotId { get; set; }
    public required string Nickname { get; set; }
    public int Score { get; set; }
    public DateTime CreatedAt { get; set; }
}