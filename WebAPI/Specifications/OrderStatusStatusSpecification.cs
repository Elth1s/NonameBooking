using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class OrderStatusStatusSpecification : Specification<OrderStatus>,ISingleResultSpecification<OrderStatus>
    {
        public OrderStatusStatusSpecification(string status)
        {
            Query.Where(item => status == item.Status);
        }
    }
}
