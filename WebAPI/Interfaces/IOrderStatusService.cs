using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IOrderStatusService
    {
        Task CreateOrderStatusAsync(OrderStatusVM model);
        Task EditOrderStatusAsync(int id, OrderStatusVM model);
        Task DeleteOrderStatusAsync(int id);
        Task<OrderStatusResponse> GetOrderStatusByIdAsync(int id);
        Task<IEnumerable<OrderStatusResponse>> GetAllOrderStatusesAsync();
    }
}
