using AutoMapper;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Constants;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        public ProfileService(IMapper mapper, UserManager<AppUser> userManager, IJwtTokenService jwtTokenService)
        {
            _mapper = mapper;
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        public async Task ChangePasswordAsync(string id, ChangePasswordVM model)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new Exception($"User with id {id} doesn't exist.");

            if (!await _userManager.CheckPasswordAsync(user, model.OldPassword))
                throw new Exception("Invalid password.");

            var resultPasswordUpdate = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
            if (!resultPasswordUpdate.Succeeded)
                throw new Exception("Updating password failed.");
        }

        public async Task<string> EditProfileAsync(string id, UserVM model)
        {
            var user=await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new Exception($"User with id {id} doesn't exist.");

            if (model.Photo != null)
            {
                if (user.Photo != null)
                {
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.UsersImagePath, user.Photo);
                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);
                }

                string randomFilename = Path.GetRandomFileName() +
                    Path.GetExtension(model.Photo.FileName);

                string dirPath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.UsersImagePath);
                string fileName = Path.Combine(dirPath, randomFilename);
                using (var file = System.IO.File.Create(fileName))
                {
                    model.Photo.CopyTo(file);
                }
                user.Photo = randomFilename;

            }
            user.Name = model.Name;
            user.Surname = model.Surname;
            user.PhoneNumber = model.Phone;

            var resultUserUpdate = await _userManager.UpdateAsync(user);
            if (!resultUserUpdate.Succeeded)
                throw new Exception("Updating user failed.");

            return await _jwtTokenService.CreateTokenAsync(user);
        }

        public async Task<UserResponse> GetProfileAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new Exception($"User with id {id} doesn't exist.");

            var result = _mapper.Map<UserResponse>(user);
            return result;
        }
    }
}
