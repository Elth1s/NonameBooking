using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class FilterNameInFilterGroupSpecification : Specification<Filter>
    {
            public FilterNameInFilterGroupSpecification(string filterName, int groupId)
            {
                Query.Where(item => groupId == item.FilterGroupId && filterName == item.Name);
            }
        
    }
}
