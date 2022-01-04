using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = ex.Message });
            }
        }


        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> EditOrder(string id, [FromBody] OrderVM model)
        {
            try
            {
                await _service.EditOrderAsync(id, model);
                return Ok("Order successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = ex.Message });
            }
        }
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
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = ex.Message });
            }
        }

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
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = ex.Message });
            }
        }
    }
}
