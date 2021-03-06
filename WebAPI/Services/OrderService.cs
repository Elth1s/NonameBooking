using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Constants;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;
using WebAPI.Specifications;

namespace WebAPI.Services
{
    public class OrderService: IOrderService
    {
        private readonly IRepository<OrderStatus> _orderStatusRepository;
        private readonly IRepository<Order> _orderRepository;
        private readonly IRepository<Apartment> _apartmentRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public OrderService(
            IRepository<OrderStatus> orderStatusRepository,
            IRepository<Order> orderRepository,
            IRepository<Apartment> apartmentRepository,
             UserManager<AppUser> userManager,
            IMapper mapper)
        {
            _orderStatusRepository = orderStatusRepository;
            _orderRepository = orderRepository;
            _apartmentRepository = apartmentRepository;
            _userManager = userManager;
            _mapper = mapper;
        }
        public async Task CreateOrderAsync(OrderVM model)
        {
            var apartment = await _apartmentRepository.GetByIdAsync(model.ApartmentId);
            if (apartment == null)
                throw new Exception($"Failed to create order! Apartment with id {model.ApartmentId} doesn't exist.");

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
                throw new Exception($"Failed to create order! User with id {model.UserId} doesn't exist.");

            var spec = new OrderStatusStatusSpecification(OrderStatuses.Processing);
            var status = await _orderStatusRepository.GetBySpecAsync(spec);
            if (status == null)
                throw new Exception($"Failed to create order!");
            
            var order = _mapper.Map<Order>(model);
            order.OrderStatusId = status.Id;
            await _orderRepository.AddAsync(order);
            await _orderRepository.SaveChangesAsync();
        }
        public async Task EditOrderStatusToCanceledAsync (string id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null)
                throw new Exception($"Failed to create order! Order with id {id} doesn't exist.");
            var spec = new OrderStatusStatusSpecification(OrderStatuses.Canceled);
            var status = await _orderStatusRepository.GetBySpecAsync(spec);
            if (status == null)
                throw new Exception($"Failed to edit order status to {OrderStatuses.Canceled}!");

            order.OrderStatusId = status.Id;

            await _orderRepository.UpdateAsync(order);
            await _orderRepository.SaveChangesAsync();
        }
        public async Task EditOrderStatusToBookedAsync(string id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null)
                throw new Exception($"Failed to create order! Order with id {id} doesn't exist.");
            var spec = new OrderStatusStatusSpecification(OrderStatuses.Booked);
            var status = await _orderStatusRepository.GetBySpecAsync(spec);
            if (status == null)
                throw new Exception($"Failed to edit order status to {OrderStatuses.Booked}!");

            order.OrderStatusId = status.Id;

            await _orderRepository.UpdateAsync(order);
            await _orderRepository.SaveChangesAsync();
        }
        public async Task DeleteOrderAsync(string id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null)
                throw new Exception($"Order with id {id} doesn't exist.");

            await _orderRepository.DeleteAsync(order);
            await _orderRepository.SaveChangesAsync();
        }


        public async Task<IEnumerable<OrderFullInfoResponse>> GetAllOrdersAsync()
        {
            var spec = new OrderIncludeFullInfoSpecification();
            var orders = await _orderRepository.ListAsync(spec);
            var result = orders.Select(o => _mapper.Map<OrderFullInfoResponse>(o));
            return result;
        }

        public async Task<OrderFullInfoResponse> GetOrderByIdAsync(string id)
        {
            var spec = new OrderIncludeFullInfoSpecification(id);
            var order = await _orderRepository.GetBySpecAsync(spec);
            if (order == null)
                throw new Exception($"Order with id {id} doesn't exist.");

            var result = _mapper.Map<OrderFullInfoResponse>(order);

            if (result.OrderStatusName == OrderStatuses.Booked && DateTime.Now.Date <= result.End.Date)
                result.Address = order.Apartment.Address;

            return result;
        }
        public async Task<IEnumerable<OrderResponse>> GetOrdersByApartmentIdAsync(int apartmentId)
        {
            var spec = new ApartmentIncludeInfoSpecification(apartmentId);
            var apartment = await _apartmentRepository.GetBySpecAsync(spec);
            if (apartment == null)
                throw new Exception($"Apartment with id {apartmentId} doesn't exist.");
        
                
            var result = apartment.Orders.Select(o => _mapper.Map<OrderResponse>(o));
            return result;

        }
        public async Task<IEnumerable<OrderResponse>> GetOrdersByUserIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} doesn't exist.");

            var spec = new OrderGetByUserIdIncludeFullInfoSpecification(userId);
            var orders = await _orderRepository.ListAsync(spec);
            var result =orders.Select(o=>_mapper.Map<OrderResponse>(o));
            return result;

        }
    }
}
