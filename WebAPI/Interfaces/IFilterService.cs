using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IFilterService
    {
        Task CreateFilterAsync(FilterVM model);
        Task EditFilterAsync(int id, FilterVM model);
        Task DeleteFilterAsync(int id);
  //      Task<FilterResponse> GetFilterById(int id);
        Task<IEnumerable<FilterResponse>> GetAllFiltersAsync();
    }
}
