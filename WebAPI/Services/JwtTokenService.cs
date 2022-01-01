using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Interfaces;

namespace WebAPI.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;

        public JwtTokenService(IConfiguration configuration,
            UserManager<AppUser> userManager)
        {
            _configuration=configuration;
            _userManager = userManager;
        }
        public async Task<string> CreateTokenAsync(AppUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            
            List<Claim> claims = new ()
            {
                new Claim("Id", user.Id),
                new Claim("Name", user.Name),
                new Claim("Surname", user.Surname)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("Roles", role));
            }
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<String>("JwtKey")));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(7),
                claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
