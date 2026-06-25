namespace EatList.Api.DTOs.Request;

public class LoginDto
{
    public required int BoardId { get; set; }
    public required string Password { get; set; }
    
}