namespace EatList.Api.Models;
public class Board
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Password { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public List<Spot> Spots { get; set; } = new();
    public List<RefreshToken> RefreshTokens { get; set; } = new();
}