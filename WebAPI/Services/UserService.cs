using AutoMapper;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Constants;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        public UserService(UserManager<AppUser> userManager, IJwtTokenService jwtTokenService, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }
        public async Task<string> CreateUserAsync(RegisterVM user)
        {
            var _user = _mapper.Map<AppUser>(user);

            var result = await _userManager.CreateAsync(_user, user.Password);
            if (!result.Succeeded)
            {
                throw new Exception("User creation failed!");
            }
            var resultRole =await  _userManager.AddToRoleAsync(_user, Roles.User);
            if (!resultRole.Succeeded)
            {
                throw new Exception($"Failed to add { Roles.User } role to { _user.Email}.");
            }
            return await _jwtTokenService.CreateTokenAsync(_user);
        }
    }
}
