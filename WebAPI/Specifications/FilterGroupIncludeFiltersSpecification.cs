using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class FilterGroupIncludeFiltersSpecification:Specification<FilterGroup>
    {
        public FilterGroupIncludeFiltersSpecification()
        {
            Query.Include(f => f.Filters);
        }
    }
}
