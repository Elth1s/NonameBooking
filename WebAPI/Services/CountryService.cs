using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Services
{
    public class CountryService : ICountryService
    {
        private readonly IRepository<Country> _repository;
        private readonly IMapper _mapper;
        public CountryService(IRepository<Country> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task CreateCountryAsync(CountryVM model)
        {
            var country= _mapper.Map<Country>(model);
            await _repository.AddAsync(country);
            await _repository.SaveChangesAsync();
        }
        public async Task EditCountryAsync(int id,CountryVM model)
        {
            var country = await _repository.GetByIdAsync(id);
            if (country == null)
                throw new Exception($"Country with id {id} doesn't exist.");

            country.Name = model.Name;

            await _repository.UpdateAsync(country);
            await _repository.SaveChangesAsync();
        }


        public async Task DeleteCountryAsync(int id)
        {
            var country = await _repository.GetByIdAsync(id);
            if (country == null)
                throw new Exception($"Country with id {id} doesn't exist.");
            
            await _repository.DeleteAsync(country);
            await _repository.SaveChangesAsync();
        }


        public async Task<IEnumerable<CountryResponse>> GetAllCountiesAsync()
        {
            var countries = await _repository.ListAsync();
            var result = countries.Select(c=> _mapper.Map<CountryResponse>(c)); 
            return result;
           
        }
    }
}
