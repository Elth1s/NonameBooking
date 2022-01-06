using AutoMapper;
using DAL;
using DAL.Models;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Services
{
    public class OrderStatusService: IOrderStatusService
    {    
        private readonly IRepository<OrderStatus> _repository;
        private readonly IMapper _mapper;
        public OrderStatusService(IRepository<OrderStatus> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task CreateOrderStatusAsync(OrderStatusVM model)
        {
            var status = _mapper.Map<OrderStatus>(model);
            await _repository.AddAsync(status);
            await _repository.SaveChangesAsync();
        }
        public async Task EditOrderStatusAsync(int id, OrderStatusVM model)
        {
            var status = await _repository.GetByIdAsync(id);
            if (status == null)
                throw new Exception($"Order status with id {id} doesn't exist.");

            status.Status = model.Status;

            await _repository.UpdateAsync(status);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteOrderStatusAsync(int id)
        {
            var status = await _repository.GetByIdAsync(id);
            if (status == null)
                throw new Exception($"Order status with id {id} doesn't exist.");

            await _repository.DeleteAsync(status);
            await _repository.SaveChangesAsync();
        }
        public async Task<OrderStatusResponse> GetOrderStatusByIdAsync(int id)
        {
            var status = await _repository.GetByIdAsync(id);
            if (status == null)
                throw new Exception($"Order status with id {id} doesn't exist.");

            var result = _mapper.Map<OrderStatusResponse>(status);
            return result;
        }


        public async Task<IEnumerable<OrderStatusResponse>> GetAllOrderStatusesAsync()
        {
            var statuses = await _repository.ListAsync();
            var result = statuses.Select(o => _mapper.Map<OrderStatusResponse>(o));
            return result;
        }

    }
}
