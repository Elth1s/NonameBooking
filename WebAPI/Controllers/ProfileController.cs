using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _service;

        public ProfileController(IProfileService service)
        {
            _service = service;
        }

        [HttpPut]
        [Route("edit-profile/{id}")]
        public async Task<IActionResult> EditProfile(string id,[FromForm] UserVM model)
        {
            try
            {
               string token= await _service.EditProfileAsync(id, model);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpPut]
        [Route("change-password/{id}")]
        public async Task<IActionResult> ChangePassword(string id, [FromBody] ChangePasswordVM model)
        {
            try
            {
                await _service.ChangePasswordAsync(id, model);
                return Ok("Password successfully changed.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-profile/{id}")]
        public async Task<IActionResult> GetProfile(string id)
        {
            try
            {
              var result=  await _service.GetProfileAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
    }
}
