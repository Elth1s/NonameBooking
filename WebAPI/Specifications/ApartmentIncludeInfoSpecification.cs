using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class ApartmentIncludeInfoSpecification : Specification<Apartment>,ISingleResultSpecification
    {
        public ApartmentIncludeInfoSpecification()
        {
            Query.Include(a => a.TypeOfApartment)
                .Include(a => a.City)
                .Include(a=>a.Images)
                .Include(a=>a.Filters)
                .ThenInclude(f=>f.FilterGroup)
                .AsSplitQuery();
        }
        public ApartmentIncludeInfoSpecification(int id)
        {
            Query.Where(a => a.Id == id)
                .Include(a => a.TypeOfApartment)
                .Include(a => a.City)
                .ThenInclude(c => c.Country)
                .Include(a => a.Owner)
                .Include(a => a.Orders)
                .ThenInclude(o=>o.OrderStatus)
                .Include(a => a.Images)
                .Include(a => a.Filters)
                .ThenInclude(f=>f.FilterGroup)
                .AsSplitQuery();
        }
    }
}
