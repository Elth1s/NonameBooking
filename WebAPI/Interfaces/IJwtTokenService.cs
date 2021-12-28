using DAL.Models;

namespace WebAPI.Interfaces
{
    public interface IJwtTokenService
    {
        Task<string> CreateTokenAsync(AppUser user);
    }
}
