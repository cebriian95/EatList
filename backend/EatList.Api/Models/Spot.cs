namespace EatList.Api.Models;

public enum SpotStatus
{
    Pendiente,
    Visitado,
}

public class Spot
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public SpotStatus Status { get; set; }
    public string Location { get; set; } = string.Empty;
    public string LocationMap { get; set; } = string.Empty;
    public int BoardId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public Board? Board { get; set; }

    public List<Rating> Ratings { get; set; } = new();

}