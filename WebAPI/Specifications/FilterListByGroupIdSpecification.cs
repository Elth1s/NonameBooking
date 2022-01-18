using Ardalis.Specification;
using DAL.Models;

namespace WebAPI.Specifications
{
    public class FilterListByGroupIdSpecification : Specification<Filter>
    {
        public FilterListByGroupIdSpecification(int groupId)
        {
            Query.Where(f => f.FilterGroupId == groupId);
        }
    }
}
