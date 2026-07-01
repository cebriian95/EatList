namespace EatList.Api.DTOs.Response;

public class LoginResponseDto
{
    public required string Token { get; set; }
    public required string RefreshToken { get; set; }
    public required BoardResponseDto Board { get; set; }
    public string? PlainPassword { get; set; }
}
