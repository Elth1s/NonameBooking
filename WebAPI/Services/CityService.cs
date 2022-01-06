using AutoMapper;
using DAL;
using DAL.Models;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;
using WebAPI.Specifications;

namespace WebAPI.Services
{
    public class CityService : ICityService
    {
        private readonly IRepository<City> _cityRepository;
        private readonly IReadRepository<Country> _countryRepository;
        private readonly IMapper _mapper;
        public CityService(IRepository<City> cityRepository, IReadRepository<Country> countryRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _countryRepository = countryRepository;
            _mapper = mapper;
        }
        public async Task CreateCityAsync(CityVM model)
        {
            var country = await _countryRepository.GetByIdAsync(model.CountryId);
            if (country == null)
                throw new Exception($"Failed to create city! Country with id {model.CountryId} doesn't exist.");

            var city = _mapper.Map<City>(model);
            await _cityRepository.AddAsync(city);
            await _cityRepository.SaveChangesAsync();
        }
        public async Task EditCityAsync(int id, CityVM model)
        {
            var country = await _countryRepository.GetByIdAsync(model.CountryId);
            if (country == null)
                throw new Exception($"Failed to edit city! Country with id {model.CountryId} doesn't exist.");

            var city = await _cityRepository.GetByIdAsync(id);
            if (city == null)
                throw new Exception($"City with id {id} doesn't exist.");

            city.Name = model.Name;
            city.CountryId = model.CountryId;

            await _cityRepository.UpdateAsync(city);
            await _cityRepository.SaveChangesAsync();
        }

        public async Task DeleteCityAsync(int id)
        {
            var city = await _cityRepository.GetByIdAsync(id);
            if (city == null)
                throw new Exception($"City with id {id} doesn't exist.");

            await _cityRepository.DeleteAsync(city);
            await _cityRepository.SaveChangesAsync();
        }

        public async Task<CityFullInfoResponse> GetCityByIdAsync(int id)
        {
            var city = await _cityRepository.GetByIdAsync(id);
            if (city == null)
                throw new Exception($"City with id {id} doesn't exist.");

            var result = _mapper.Map<CityFullInfoResponse>(city);
            return result;
        }

        public async Task<IEnumerable<CityResponse>> GetCitiesByCountryIdAsync(int id)
        {
            var country = await _countryRepository.GetByIdAsync(id);
            if (country == null)
                throw new Exception($"Country with id {id} doesn't exist.");

            var spec = new CitiesByCountryIdSpecification(id);
            var cities = await _cityRepository.ListAsync(spec);
            var result = cities.Select(c => _mapper.Map<CityResponse>(c));
            return result;
        }
        

        public async Task<IEnumerable<CityFullInfoResponse>> GetAllCitiesAsync()
        {
            var cities = await _cityRepository.ListAsync();
            var result = cities.Select(c => _mapper.Map<CityFullInfoResponse>(c));
            return result;
        }

    }
}
