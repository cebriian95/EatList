namespace EatList.Api.Models;
public class RefreshToken
{
    public int Id { get; set; }
     public int BoardId { get; set; }
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? RevokedAt { get; set; }


    public Board? Board { get; set; }
}