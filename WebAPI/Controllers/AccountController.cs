using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtTokenService _tokenService;

        public AccountController(IUserService userService, UserManager<AppUser> userManager, IJwtTokenService tokenService)
        {
            _userManager = userManager;
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("signUp")]
        public async Task<IActionResult> SignUp([FromBody] RegisterVM model)
        {
            try
            {
                string token = await _userService.CreateUserAsync(model);
                return Ok(new { token });
            }        
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = ex.Message });
            }
        }
        [HttpPost]
        [Route("logIn")]
        public async Task<IActionResult> LogIn([FromBody] LoginVM model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    string token = await _tokenService.CreateTokenAsync(user);
                    return Ok(new { token });
                }
                else
                {
                    throw new Exception("Invalid email or password!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new { Status = "Error", Message = ex.Message });
            }
        }
    }
}
