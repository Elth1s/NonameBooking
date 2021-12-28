using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        public UserService(UserManager<AppUser> userManager, IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }
        public async Task<string> CreateUserAsync(RegisterVM user)
        {
            var userExists = await _userManager.FindByEmailAsync(user.Email);
            if (userExists != null)
                throw new Exception("User already exists!");

            AppUser _user = new AppUser()
            {
                Name = user.Name,
                Surname = user.Surname,
                PhoneNumber = user.Phone,
                Email = user.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = user.Email
            };
            var result = await _userManager.CreateAsync(_user, user.Password);
            if (!result.Succeeded)
            {
                new Exception("User creation failed!");
            }

            return await _jwtTokenService.CreateTokenAsync(_user);
        }
    }
}
