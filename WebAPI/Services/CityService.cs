using AutoMapper;
using DAL;
using DAL.Models;
using WebAPI.Constants;
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

            if (model.Image == null)
                throw new Exception($"Failed to create city! Image is required.");

            var city = _mapper.Map<City>(model);

                string randomFilename = Path.GetRandomFileName() +
                    Path.GetExtension(model.Image.FileName);

                string dirPath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.CitiesImagePath);
                string fileName = Path.Combine(dirPath, randomFilename);
                using (var file = System.IO.File.Create(fileName))
                {
                    model.Image.CopyTo(file);
                }
                city.Image = randomFilename;
          
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

            if (model.Image != null)
            {
                if (city.Image != null)
                {
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.CitiesImagePath, city.Image);
                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);
                }

                string randomFilename = Path.GetRandomFileName() +
                    Path.GetExtension(model.Image.FileName);

                string dirPath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.CitiesImagePath);
                string fileName = Path.Combine(dirPath, randomFilename);
                using (var file = System.IO.File.Create(fileName))
                {
                    model.Image.CopyTo(file);
                }
                city.Image = randomFilename;

            }

            await _cityRepository.UpdateAsync(city);
            await _cityRepository.SaveChangesAsync();
        }

        public async Task DeleteCityAsync(int id)
        {
            var city = await _cityRepository.GetByIdAsync(id);
            if (city == null)
                throw new Exception($"City with id {id} doesn't exist.");

            if (city.Image != null)
            {
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.CitiesImagePath, city.Image);
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);
            }

            await _cityRepository.DeleteAsync(city);
            await _cityRepository.SaveChangesAsync();
        }

        public async Task<CityFullInfoResponse> GetCityByIdAsync(int id)
        {
            var spec = new CityIncludeInfoSpecification(id);
            var city = await _cityRepository.GetBySpecAsync(spec);
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

            var spec = new CityListByCountryIdSpecification(id);
            var cities = await _cityRepository.ListAsync(spec);
            var result = cities.Select(c => _mapper.Map<CityResponse>(c));
            return result;
        }
        

        public async Task<IEnumerable<CityFullInfoResponse>> GetAllCitiesAsync()
        {
            var spec = new CityIncludeInfoSpecification();
            var cities = await _cityRepository.ListAsync(spec);
            var result = cities.Select(c => _mapper.Map<CityFullInfoResponse>(c));
            return result;
        }


    }
}
