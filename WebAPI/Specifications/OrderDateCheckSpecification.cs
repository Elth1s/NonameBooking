using Ardalis.Specification;
using DAL.Models;
using WebAPI.Constants;

namespace WebAPI.Specifications
{
    public class OrderDateCheckSpecification : Specification<Order>
    {
        public OrderDateCheckSpecification(int apartmentId,DateTime start, DateTime end)
        {
            Query.Include(o=>o.OrderStatus)
                .Where(o => 
                o.ApartmentId == apartmentId &&
                o.OrderStatus.Status!=OrderStatuses.Canceled &&
                !(start.Date >= o.End.Date || end.Date <= o.Start.Date));
        }
    }
}
