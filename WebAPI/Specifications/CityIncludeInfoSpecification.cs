using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class CityIncludeInfoSpecification:Specification<City>
    {
        public CityIncludeInfoSpecification()
        {
            Query.Include(c => c.Country);
        }
    }
}
