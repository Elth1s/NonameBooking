using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class ApartmentGetByOwnerIdSpecification : Specification<Apartment>
    {
        public ApartmentGetByOwnerIdSpecification(string ownerId)
        {
            Query.Where(a => a.OwnerId == ownerId)
                .Include(a => a.TypeOfApartment)
                .Include(a => a.City)
                .Include(a => a.Images)
                .Include(a => a.Filters)
                .AsSplitQuery();
        }
    }
}
