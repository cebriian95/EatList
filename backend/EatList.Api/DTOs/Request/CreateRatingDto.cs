namespace EatList.Api.DTOs.Request;

public class CreateRatingDto
{
    public required string Nickname { get; set; }
    public required int Score { get; set; }
}