using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class FilterListByIdSpecification : Specification<Filter>
    {
        public FilterListByIdSpecification(IEnumerable<int>filtersId)
        {
           Query.Where(f => filtersId.Contains(f.Id));
        }
    }
}
