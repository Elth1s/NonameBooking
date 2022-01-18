using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IOrderService
    {
        Task CreateOrderAsync(OrderVM model);
        Task EditOrderStatusAsync(string id, int orderStatusId);
        Task DeleteOrderAsync(string id);
        Task<OrderFullInfoResponse> GetOrderByIdAsync(string id);
        Task<IEnumerable<OrderResponse>> GetOrdersByUserIdAsync(string userId);
        Task<IEnumerable<OrderFullInfoResponse>> GetAllOrdersAsync();
    }
}
