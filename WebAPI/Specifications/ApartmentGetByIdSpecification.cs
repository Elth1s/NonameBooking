using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class ApartmentGetByIdSpecification: Specification<Apartment>,ISingleResultSpecification<Apartment>
    {
        public ApartmentGetByIdSpecification(int id)
        {
            Query.Where(a=>a.Id==id).Include(a => a.Images).Include(a=>a.Filters).AsSplitQuery();
        }
    }
}
