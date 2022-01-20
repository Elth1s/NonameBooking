using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface IApartmentService
    {
        Task CreateApartmentAsync(ApartmentVM model);
        Task EditApartmentAsync(int id, EditApartmentVM model);
        Task DeleteApartmentAsync(int id);
        Task<ApartmentFullInfoResponse> GetApartmentByIdAsync(int id);
       
        Task<IEnumerable<ApartmentResponse>>GetApartmentsByOwnerIdAsync(string ownerId);
        Task <CityWithApartmentsWithCountResponse> SearchApartmentsByCityAsync(ApartmentRequest request);

        Task<IEnumerable<CityWithApartmentResponse>> SearchApartmentsGroupByCityAsync(ApartmentGroupByCityRequest request);
        Task<IEnumerable<ApartmentResponse>> GetAllApartmentsAsync();
    }
}
