using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class CountryNameSpecification : Specification<Country>
    {
        public CountryNameSpecification(string countryName)
        {
            Query.Where(item => countryName == item.Name);
        }
    }
}
