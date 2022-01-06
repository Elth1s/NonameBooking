using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class OrderDateCheckSpecification : Specification<Order>
    {
        public OrderDateCheckSpecification(int apartmentId,DateTime start, DateTime end)
        {
            Query.Where(o => o.ApartmentId == apartmentId && !(start.Date >= o.End.Date || end.Date <= o.Start.Date));
        }
    }
}
