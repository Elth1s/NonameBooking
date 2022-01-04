using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IFilterGroupService
    {
        Task CreateFilterGroupAsync(FilterGroupVM model);
        Task EditFilterGroupAsync(int id, FilterGroupVM model);
        Task DeleteFilterGroupAsync(int id);
    //    Task<FilterGroupResponse> GetFilterGroupById(int id);
        Task<IEnumerable<FilterGroupResponse>> GetAllFilterGroupsAsync();
    }
}
