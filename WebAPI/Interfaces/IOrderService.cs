using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IOrderService
    {
        Task CreateOrderAsync(OrderVM model);
        Task EditOrderAsync(string id, OrderVM model);
        Task DeleteOrderAsync(string id);
     //   Task<OrderResponse> GetOrderById(string id);
        Task<IEnumerable<OrderResponse>> GetAllOrdersAsync();
    }
}
