using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IApartmentService
    {
        Task CreateApartmentAsync(ApartmentVM model);
        Task EditApartmentAsync(int id, EditApartmentVM model);
        Task DeleteApartmentAsync(int id);
        Task<ApartmentResponse> GetApartmentByIdAsync(int id);
        Task<IEnumerable<ApartmentShortInfoResponse>> GetAllApartmentsAsync();
    }
}
