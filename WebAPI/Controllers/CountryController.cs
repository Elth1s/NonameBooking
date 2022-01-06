using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _service;
        public CountryController(ICountryService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateCountry([FromBody] CountryVM model)
        {
            try
            {
                await _service.CreateCountryAsync(model);
                return Ok("Country successfully created.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> EditCountry(int id,[FromBody] CountryVM model)
        {
            try
            {
                await _service.EditCountryAsync(id,model);
                return Ok("Country successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            try
            {
                await _service.DeleteCountryAsync(id);
                return Ok("Country successfully deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-by-id/{id}")]
        public async Task<IActionResult> GetCountryById(int id)
        {
            try
            {
                var _result = await _service.GetCountryByIdAsync(id);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllCountries()
        {
            try
            {
               var _result= await _service.GetAllCountiesAsync();
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
    }
}
