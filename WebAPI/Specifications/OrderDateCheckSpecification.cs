using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class OrderDateCheckSpecification : Specification<Order>
    {
        public OrderDateCheckSpecification(int apartmentId,DateTime start, DateTime end)
        {
            Query.Where(o => o.ApartmentId == apartmentId && !(start >= o.End || end <= start));
        }
    }
}
