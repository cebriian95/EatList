namespace EatList.Api.DTOs.Response;

public class LoginResponse
{
    public required string Token { get; set; }
    public required string RefreshToken { get; set; }
    public required BoardResponseDto Board { get; set; }
}
