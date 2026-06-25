namespace EatList.Api.DTOs.Request;
public class CreateBoardDto
{
    public required string Name { get; set; }
    public required string Password { get; set; }
}