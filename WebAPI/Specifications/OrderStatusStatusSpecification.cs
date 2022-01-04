using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class OrderStatusStatusSpecification : Specification<OrderStatus>
    {
        public OrderStatusStatusSpecification(string status)
        {
            Query.Where(item => status == item.Status);
        }
    }
}
