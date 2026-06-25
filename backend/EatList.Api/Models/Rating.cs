namespace EatList.Api.Models;
public class Rating
{
    public Guid Id { get; set; }
    public Guid SpotId { get; set; }
    public required string Nickname { get; set; }
    public int Score { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public Spot? Spot { get; set; }
}