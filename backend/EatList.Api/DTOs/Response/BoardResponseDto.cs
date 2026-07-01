namespace EatList.Api.DTOs.Response;

public class BoardResponseDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public DateTime CreatedAt { get; set; }
}