using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;
        public OrderController(IOrderService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderVM model)
        {
            try
            {
                await _service.CreateOrderAsync(model);
                return Ok("Order successfully created.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        
        [HttpPut]
        [Route("edit-status-to-booked/{id}")]
        public async Task<IActionResult> EditStatusToBookedOrder(string id)
        {
            try
            {
                await _service.EditOrderStatusToBookedAsync(id);
                return Ok("Order successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpPut]
        [Route("edit-status-to-canceled/{id}")]
        public async Task<IActionResult> EditStatusToCanceledOrder(string id)
        {
            try
            {
                await _service.EditOrderStatusToCanceledAsync(id);
                return Ok("Order successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            try
            {
                await _service.DeleteOrderAsync(id);
                return Ok("Order successfully deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpGet]
        [Route("get-by-id/{id}")]
        public async Task<IActionResult> GetOrderByIdAsync(string id)
        {
            try
            {
                var _result = await _service.GetOrderByIdAsync(id);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpGet]
        [Route("get-by-user-id/{userId}")]
        public async Task<IActionResult> GetOrdersByUserIdAsync(string userId)
        {
            try
            {
                var _result = await _service.GetOrdersByUserIdAsync(userId);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var _result = await _service.GetAllOrdersAsync();
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }


        [HttpGet]
        [Route("get-by-apartment-id/{apartmentId}")]
        public async Task<IActionResult> GetOrdersByApartmentIdAsync(int apartmentId)
        {
            try
            {
                var _result = await _service.GetOrdersByApartmentIdAsync(apartmentId);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        
    }
}
