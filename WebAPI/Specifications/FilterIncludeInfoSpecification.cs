using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class FilterIncludeInfoSpecification: Specification<Filter>, ISingleResultSpecification<Filter>
    {
        public FilterIncludeInfoSpecification()
        {
            Query.Include(f => f.FilterGroup);
        }
        public FilterIncludeInfoSpecification(int id)
        {
            Query.Where(f=>f.Id==id).Include(f => f.FilterGroup);
        }
    }
}
