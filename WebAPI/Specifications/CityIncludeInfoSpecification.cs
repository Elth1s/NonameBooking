using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class CityIncludeInfoSpecification:Specification<City>,ISingleResultSpecification<City>
    {
        public CityIncludeInfoSpecification()
        {
            Query.Include(c => c.Country);
        }
        public CityIncludeInfoSpecification(int id)
        {
            Query.Where(c=>c.Id==id).Include(c => c.Country);
        }
    }
}
