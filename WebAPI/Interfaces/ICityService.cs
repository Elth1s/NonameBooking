using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface ICityService
    {
        Task CreateCityAsync(CityVM model);
        Task EditCityAsync(int id, CityVM model);
        Task DeleteCityAsync(int id);
        Task<CityFullInfoResponse> GetCityByIdAsync(int id);

        Task<IEnumerable<CityResponse>> GetCitiesByCountryIdAsync(int id);

        Task<IEnumerable<CityFullInfoResponse>> GetAllCitiesAsync();
    }
}
