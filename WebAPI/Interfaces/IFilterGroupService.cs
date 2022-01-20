using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IFilterGroupService
    {
        Task CreateFilterGroupAsync(FilterGroupVM model);
        Task EditFilterGroupAsync(int id, FilterGroupVM model);
        Task DeleteFilterGroupAsync(int id);
        Task<FilterGroupResponse> GetFilterGroupByIdAsync(int id);
        Task<IEnumerable<FilterGroupWithFiltersResponse>> GetAllFilterGroupsWithFiltersAsync();
        Task<IEnumerable<FilterGroupResponse>> GetAllFilterGroupsAsync();
    }
}
