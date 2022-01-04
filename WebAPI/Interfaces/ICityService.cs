using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface ICityService
    {
        Task CreateCityAsync(CityVM model);
        Task EditCityAsync(int id, CityVM model);
        Task DeleteCityAsync(int id);
        Task<CityResponse> GetCityByIdAsync(int id);
        Task<IEnumerable<CityResponse>> GetAllCitiesAsync();
    }
}
