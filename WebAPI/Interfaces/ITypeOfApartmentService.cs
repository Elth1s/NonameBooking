using DAL.Models;
using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Interfaces
{
    public interface ITypeOfApartmentService
    {
        Task CreateTypeOfApartmentAsync(TypeOfApartmentVM model);
        Task EditTypeOfApartmentAsync(int id, TypeOfApartmentVM model);
        Task DeleteTypeOfApartmentAsync(int id);
     //   Task<TypeOfApartmentResponse> GetTypeOfApartmentById(string id);
        Task<IEnumerable<TypeOfApartmentResponse>> GetAllTypesAsync();
    }
}
