using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserService
    {
        Task<string> CreateUserAsync(RegisterVM model);
    }
}
