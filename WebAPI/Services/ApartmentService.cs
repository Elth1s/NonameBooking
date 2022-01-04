using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;
using WebAPI.Specifications;

namespace WebAPI.Services
{
    public class ApartmentService : IApartmentService
    {
        private readonly IRepository<Apartment> _apartmentRepository;
        private readonly IRepository<TypeOfApartment> _typeOfApartmentRepository;
        private readonly IRepository<City> _cityRepository;
        private readonly UserManager<AppUser> _userManager;

        private readonly IMapper _mapper;

        public ApartmentService(
            IRepository<Apartment> apartmentRepository,
            IRepository<TypeOfApartment> typeOfApartmentRepository,
            IRepository<City> cityRepository,
            UserManager<AppUser> userManager, 
            IMapper mapper)
        {
            _apartmentRepository = apartmentRepository;
            _typeOfApartmentRepository = typeOfApartmentRepository;
            _cityRepository = cityRepository;
            _userManager = userManager;
            _mapper = mapper;
        }
        public async Task CreateApartmentAsync(ApartmentVM model)
        {
            var type = await _typeOfApartmentRepository.GetByIdAsync(model.TypeOfApartmentId);
            if (type == null)
                throw new Exception($"Failed to create apartment! Type of apartment with id {model.TypeOfApartmentId} doesn't exist.");
            
            var city = await _cityRepository.GetByIdAsync(model.CityId);
            if (city == null)
                throw new Exception($"Failed to create apartment! City with id {model.CityId} doesn't exist.");

            var user = await _userManager.FindByIdAsync(model.OwnerId);
            if (user == null)
                throw new Exception($"Failed to create apartment! User with id {model.OwnerId} doesn't exist.");

            var apartment=_mapper.Map<Apartment>(model);
            await _apartmentRepository.AddAsync(apartment);
            await _cityRepository.SaveChangesAsync();
        }
        public async Task EditApartmentAsync(int id, ApartmentVM model)
        {
            var type = await _typeOfApartmentRepository.GetByIdAsync(model.TypeOfApartmentId);
            if (type == null)
                throw new Exception($"Failed to edit apartment! Type of apartment with id {model.TypeOfApartmentId} doesn't exist.");

            var city = await _cityRepository.GetByIdAsync(model.CityId);
            if (city == null)
                throw new Exception($"Failed to edit apartment! City with id {model.CityId} doesn't exist.");

            var user = await _userManager.FindByIdAsync(model.OwnerId);
            if (user == null)
                throw new Exception($"Failed to edit apartment! User with id {model.OwnerId} doesn't exist.");

            var apartment = await _apartmentRepository.GetByIdAsync(id);
            if (apartment == null)
                throw new Exception($"Apartment with id {id} doesn't exist.");

            apartment.Name = model.Name;
            apartment.Description = model.Description;
            apartment.OwnerId = model.OwnerId;
            apartment.CityId = model.CityId;
            apartment.Price = model.Price;
            apartment.TypeOfApartmentId = model.TypeOfApartmentId;

            await _apartmentRepository.UpdateAsync(apartment);
            await _apartmentRepository.SaveChangesAsync();
        }

        public async Task DeleteApartmentAsync(int id)
        {
            var apartment = await _apartmentRepository.GetByIdAsync(id);
            if (apartment == null)
                throw new Exception($"Apartment with id {id} doesn't exist.");


            await _apartmentRepository.DeleteAsync(apartment);
            await _apartmentRepository.SaveChangesAsync();
        }
        public async Task<ApartmentResponse> GetApartmentByIdAsync(int id)
        {
            var spec = new ApartmentIncludeInfoSpecification(id);
            var apartment = await _apartmentRepository.GetBySpecAsync(spec);
            if (apartment == null)
                throw new Exception($"Apartment with id {id} doesn't exist.");

            var result = _mapper.Map<ApartmentResponse>(apartment);
            return result;
        }

        public async Task<IEnumerable<ApartmentShortInfoResponse>> GetAllApartmentsAsync()
        {
            var spec = new ApartmentIncludeInfoSpecification();
            var apartments = await _apartmentRepository.ListAsync(spec);
            var result = apartments.Select(a => _mapper.Map<ApartmentShortInfoResponse>(a));
            return result;
        }

    }
}
