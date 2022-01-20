using Ardalis.Specification;
using DAL.Models;
using WebAPI.Constants;

namespace WebAPI.Specifications
{
    public class OrderIncludeFullInfoSpecification : Specification<Order>,ISingleResultSpecification<Order>
    {
        public OrderIncludeFullInfoSpecification()
        {
            Query.Include(o=>o.User).Include(o=>o.OrderStatus).Include(o=>o.Apartment);
        }
        public OrderIncludeFullInfoSpecification(string id)
        {
            Query.Where(o => o.Id == id)
                .Include(o => o.User)
                .Include(o => o.OrderStatus)
                .Include(o => o.Apartment);

        }

    }
}
