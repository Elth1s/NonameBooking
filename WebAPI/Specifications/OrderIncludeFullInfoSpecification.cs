using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class OrderIncludeFullInfoSpecification : Specification<Order>
    {
        public OrderIncludeFullInfoSpecification()
        {
            Query.Include(o=>o.User).Include(o=>o.OrderStatus).Include(o=>o.Apartment);
        }
    }
}
