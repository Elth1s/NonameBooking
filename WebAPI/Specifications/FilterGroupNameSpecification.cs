using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class FilterGroupNameSpecification : Specification<FilterGroup>
    {
        public FilterGroupNameSpecification(string groupName)
        {
            Query.Where(item => groupName == item.Name);
        }
    }
}
