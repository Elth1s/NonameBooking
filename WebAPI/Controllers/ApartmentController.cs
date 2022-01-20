using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentController : ControllerBase
    {
        private readonly IApartmentService _service;
        public ApartmentController(IApartmentService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateApartment([FromForm] ApartmentVM model)
        {
            try
            {
                await _service.CreateApartmentAsync(model);
                return Ok("Apartment successfully created.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [Authorize]
        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> EditApartment(int id, [FromForm] EditApartmentVM model)
        {
            try
            {
                await _service.EditApartmentAsync(id, model);
                return Ok("Apartment successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteApartment(int id)
        {
            try
            {
                await _service.DeleteApartmentAsync(id);
                return Ok("Apartment successfully deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
      
        [HttpGet]
        [Route("get-by-id/{id}")]
        public async Task<IActionResult> GetApartmentById(int id)
        {
            try
            {
                var result=await _service.GetApartmentByIdAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllApartments()
        {
            try
            {
                var result = await _service.GetAllApartmentsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
       
        [HttpGet]
        [Route("search-group-by-city")]
        public async Task<IActionResult> SearchApartmentsGroupByCity([FromQuery] ApartmentGroupByCityRequest request)
        {
            try
            {
                var result = await _service.SearchApartmentsGroupByCityAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpGet]
        [Route("search-by-city")]
        public async Task<IActionResult> SearchApartmentsByCity([FromQuery] ApartmentRequest request)
        {
            try
            {
                var result = await _service.SearchApartmentsByCityAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpGet]
        [Route("get-by-owner-id/{ownerId}")]
        public async Task<IActionResult> GetApartmentsByOwnerId(string ownerId)
        {
            try
            {
                var result = await _service.GetApartmentsByOwnerIdAsync(ownerId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        
       
    }
}
