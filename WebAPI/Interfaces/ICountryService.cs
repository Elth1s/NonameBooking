using DAL.Models;
using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface ICountryService
    {
        Task CreateCountryAsync(CountryVM model);
        Task EditCountryAsync(int id,CountryVM model);
        Task DeleteCountryAsync(int id);
        Task<CountryResponse> GetCountryByIdAsync(int id);
        Task<IEnumerable<CountryResponse>> GetAllCountiesAsync();

    }
}
