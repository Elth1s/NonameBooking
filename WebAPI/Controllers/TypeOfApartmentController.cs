using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeOfApartmentController : ControllerBase
    {
        private readonly ITypeOfApartmentService _service;
        public TypeOfApartmentController(ITypeOfApartmentService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateTypeOfApartment([FromBody] TypeOfApartmentVM model)
        {
            try
            {
                await _service.CreateTypeOfApartmentAsync(model);
                return Ok("Type of apartment successfully created.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> EditTypeOfApartment(int id, [FromBody] TypeOfApartmentVM model)
        {
            try
            {
                await _service.EditTypeOfApartmentAsync(id, model);
                return Ok("Type of apartment successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteTypeOfApartment(int id)
        {
            try
            {
                await _service.DeleteTypeOfApartmentAsync(id);
                return Ok("Type of apartment successfully deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-by-id/{id}")]
        public async Task<IActionResult> GetTypeOfApartmentById(int id)
        {
            try
            {
                var _result = await _service.GetTypeOfApartmentByIdAsync(id);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllTypes()
        {
            try
            {
                var _result = await _service.GetAllTypesAsync();
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
    }
}
