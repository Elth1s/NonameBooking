using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class CitiesByCountryIdSpecification : Specification<City>
    {
        public CitiesByCountryIdSpecification(int countryId)
        {
            Query.Where(c => c.CountryId == countryId);
        }
    }
}
