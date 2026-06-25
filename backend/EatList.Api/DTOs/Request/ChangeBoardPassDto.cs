namespace EatList.Api.DTOs.Request;
public class ChangeBoardPassDto
{
    public required string CurrentPassword { get; set; }
    public required string NewPassword { get; set; }
}