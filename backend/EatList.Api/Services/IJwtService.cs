using System.Security.Claims;

namespace EatList.Api.Services;

public interface IJwtService
{
	string GenerateToken(Claim[] claims);
	string GenerateRefreshToken();
}
