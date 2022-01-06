using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Constants;
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
        private readonly IRepository<ApartmentImage> _apartmentImageRepository;
        private readonly IRepository<Filter> _filterRepository;
        private readonly UserManager<AppUser> _userManager;

        private readonly IMapper _mapper;

        public ApartmentService(IRepository<Filter> filterRepository,
            IRepository<Apartment> apartmentRepository,
            IRepository<TypeOfApartment> typeOfApartmentRepository,
            IRepository<City> cityRepository, 
            IRepository<ApartmentImage> apartmentImageRepository,
            UserManager<AppUser> userManager, 
            IMapper mapper)
        {
            _apartmentRepository = apartmentRepository;
            _typeOfApartmentRepository = typeOfApartmentRepository;
            _apartmentImageRepository = apartmentImageRepository;
            _cityRepository = cityRepository;
            _filterRepository = filterRepository;
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

            if (model.FiltersId != null)
            {
                foreach (var item in model.FiltersId)
                {
                    var filter = await _filterRepository.GetByIdAsync(item);
                    if (filter != null)
                    {
                        apartment.Filters.Add(filter);
                    }
                }
            }

            await _apartmentRepository.AddAsync(apartment);
            await _apartmentRepository.SaveChangesAsync();

            if (model.Images!=null)
            {
                foreach (var item in model.Images)
                {

                    string randomFilename = Path.GetRandomFileName() +
                        Path.GetExtension(item.FileName);

                    string dirPath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.ApartmentsImagePath);
                    string fileName = Path.Combine(dirPath, randomFilename);
                    using (var file = System.IO.File.Create(fileName))
                    {
                        item.CopyTo(file);
                    }
                    await _apartmentImageRepository.AddAsync(new ApartmentImage() { Name = randomFilename, ApartmentId = apartment.Id });
                }
                await _apartmentImageRepository.SaveChangesAsync();
            }


        }
        public async Task EditApartmentAsync(int id, EditApartmentVM model)
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

            var spec = new ApartmentGetByIdSpecification(id);
            var apartment = await _apartmentRepository.GetBySpecAsync(spec);
            if (apartment == null)
                throw new Exception($"Apartment with id {id} doesn't exist.");

            apartment.Name = model.Name;
            apartment.Description = model.Description;
            apartment.OwnerId = model.OwnerId;
            apartment.CityId = model.CityId;
            apartment.Price = model.Price;
            apartment.TypeOfApartmentId = model.TypeOfApartmentId;

            apartment.Filters.Clear();
            if (model.FiltersId != null)
            {
                foreach (var item in model.FiltersId)
                {
                    var filter = await _filterRepository.GetByIdAsync(item);
                    if (filter != null)
                    {
                        apartment.Filters.Add(filter);
                    }
                }
            }

            if (model.RemovedImages != null) {

                foreach (var item in model.RemovedImages)
                {
                    string fileName = Path.GetFileName(item);
                    var image = apartment.Images.FirstOrDefault(i => i.Name == fileName);

                    if (image != null)
                    {
                        string filePath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.ApartmentsImagePath, fileName);
                        if (File.Exists(filePath))
                            File.Delete(filePath);

                        await _apartmentImageRepository.DeleteAsync(image);
                    }
                }
            }

            if (model.Images!=null)
            {  
                foreach (var item in model.Images)
                {
                    string randomFilename = Path.GetRandomFileName() +
                        Path.GetExtension(item.FileName);

                    string dirPath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.ApartmentsImagePath);
                    string fileName = Path.Combine(dirPath, randomFilename);
                    using (var file = File.Create(fileName))
                    {
                        item.CopyTo(file);
                    }
                    await _apartmentImageRepository.AddAsync(new ApartmentImage() { ApartmentId = id, Name = randomFilename });
                }
            }

            await _apartmentRepository.UpdateAsync(apartment);
            await _apartmentRepository.SaveChangesAsync();
        }

        public async Task DeleteApartmentAsync(int id)
        {
            var spec = new ApartmentGetByIdSpecification(id);
            var apartment = await _apartmentRepository.GetBySpecAsync(spec);
            if (apartment == null)
                throw new Exception($"Apartment with id {id} doesn't exist.");

            foreach (var item in apartment.Images)
            {
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), ImagePath.ApartmentsImagePath, item.Name);
                if (File.Exists(filePath))
                    File.Delete(filePath);
            }
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
