using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class CityNameInCountrySpecification : Specification<City>
    {
        public CityNameInCountrySpecification(string cityName,int countryId)
        {
            Query.Where(item =>countryId==item.CountryId && cityName == item.Name);
        }
    }
}
