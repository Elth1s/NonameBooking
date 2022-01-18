using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class CityListByCountryIdSpecification : Specification<City>
    {
        public CityListByCountryIdSpecification(int countryId)
        {
            Query.Where(c => c.CountryId == countryId);
        }
    }
}
