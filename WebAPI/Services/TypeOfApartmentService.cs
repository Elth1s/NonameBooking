using AutoMapper;
using DAL;
using DAL.Models;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Services
{
    public class TypeOfApartmentService : ITypeOfApartmentService
    {
        private readonly IRepository<TypeOfApartment> _repository;
        private readonly IMapper _mapper;
        public TypeOfApartmentService(IRepository<TypeOfApartment> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task CreateTypeOfApartmentAsync(TypeOfApartmentVM model)
        {
            var type = _mapper.Map<TypeOfApartment>(model);
            await _repository.AddAsync(type);
            await _repository.SaveChangesAsync();
        }
        public async Task EditTypeOfApartmentAsync(int id, TypeOfApartmentVM model)
        {
            var type = await _repository.GetByIdAsync(id);
            if (type == null)
                throw new Exception($"Type of apartment with id {id} doesn't exist.");

            type.Name = model.Name;

            await _repository.UpdateAsync(type);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteTypeOfApartmentAsync(int id)
        {
            var type = await _repository.GetByIdAsync(id);
            if (type == null)
                throw new Exception($"Type of apartment with id {id} doesn't exist.");

            await _repository.DeleteAsync(type);
            await _repository.SaveChangesAsync();
        }

        public async Task<IEnumerable<TypeOfApartmentResponse>> GetAllTypesAsync()
        {
            var types = await _repository.ListAsync();
            var result = types.Select(t => _mapper.Map<TypeOfApartmentResponse>(t));
            return result;
        }
    }
}
