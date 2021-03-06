using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatusController : ControllerBase
    {
        private readonly IOrderStatusService _service;
        public OrderStatusController(IOrderStatusService service)
        {
            _service = service;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateOrderStatus([FromBody] OrderStatusVM model)
        {
            try
            {
                await _service.CreateOrderStatusAsync(model);
                return Ok("Order status successfully created.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> EditOrderStatus(int id, [FromBody] OrderStatusVM model)
        {
            try
            {
                await _service.EditOrderStatusAsync(id, model);
                return Ok("Order status successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteOrderStatus(int id)
        {
            try
            {
                await _service.DeleteOrderStatusAsync(id);
                return Ok("Order status successfully deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("get-by-id")]
        public async Task<IActionResult> GetOrderStatusById(int id)
        {
            try
            {
                var _result = await _service.GetOrderStatusByIdAsync(id);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [Authorize]
        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllOrderStatuses()
        {
            try
            {
                var _result = await _service.GetAllOrderStatusesAsync();
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
    }
}
