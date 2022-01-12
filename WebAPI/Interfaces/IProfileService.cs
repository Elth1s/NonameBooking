using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IProfileService
    {
        Task<UserResponse> GetProfileAsync(string id);
        Task<string> EditProfileAsync(string id,UserVM model);
        Task ChangePasswordAsync(string id, ChangePasswordVM model);
    }
}
