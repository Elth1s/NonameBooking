using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class OrderGetByUserIdIncludeFullInfoSpecification:Specification<Order>,ISingleResultSpecification<Order>
    {
        public OrderGetByUserIdIncludeFullInfoSpecification(string userId)
        {
            Query.Where(o => o.UserId == userId).Include(o => o.OrderStatus).Include(o => o.Apartment);
        }
    }
}
