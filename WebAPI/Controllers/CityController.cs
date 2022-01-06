using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityService _service;
        public CityController(ICityService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateCity([FromBody] CityVM model)
        {
            try
            {
                await _service.CreateCityAsync(model);
                return Ok("City successfully created.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> EditCity(int id, [FromBody] CityVM model)
        {
            try
            {
                await _service.EditCityAsync(id, model);
                return Ok("City successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            try
            {
                await _service.DeleteCityAsync(id);
                return Ok("City successfully deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-by-id/{id}")]
        public async Task<IActionResult> GetCityById(int id)
        {
            try
            {
                var _result = await _service.GetCityByIdAsync(id);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-cities-by-country-id/{id}")]
        public async Task<IActionResult> GetCitiesByCountryId(int id)
        {
            try
            {
                var _result = await _service.GetCitiesByCountryIdAsync(id);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllCities()
        {
            try
            {
                var _result = await _service.GetAllCitiesAsync();
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
    }
}
