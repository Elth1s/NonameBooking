using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class TypeOfApartmentNameSpecification : Specification<TypeOfApartment>
    {
        public TypeOfApartmentNameSpecification(string typeName)
        {
            Query.Where(item => typeName == item.Name);
        }
    }
}
