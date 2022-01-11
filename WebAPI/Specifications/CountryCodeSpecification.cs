using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class CountryCodeSpecification : Specification<Country>
    {
        public CountryCodeSpecification(string countryCode)
        {
            Query.Where(item => countryCode == item.Code);
        }
    }
}
