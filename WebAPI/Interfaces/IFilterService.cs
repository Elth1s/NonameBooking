using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IFilterService
    {
        Task CreateFilterAsync(FilterVM model);
        Task EditFilterAsync(int id, FilterVM model);
        Task DeleteFilterAsync(int id);
        Task<FilterWithFilterGroupResponse> GetFilterByIdAsync(int id);
        Task<IEnumerable<FilterWithFilterGroupResponse>> GetAllFiltersAsync();
    }
}
