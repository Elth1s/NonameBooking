using DAL;
using DAL.Models;
using FluentValidation;
using WebAPI.Models;
using WebAPI.Specifications;

namespace WebAPI.Validators
{
    public class ValidatorCityVM : AbstractValidator<CityVM>
    {
        private readonly IRepository<City> _repository;
        public ValidatorCityVM(IRepository<City> repository)
        {
            _repository = repository;

            //Name
            RuleFor(c => c.Name).Cascade(CascadeMode.Stop)
                   .NotEmpty().WithMessage("{PropertyName} is required!")
                   .Length(2, 90).WithMessage("{PropertyName} should be between 2 and 90 characters!")
                   .Must((o, name) => { return IsUniqueName(name, o.CountryId); }).WithMessage("{PropertyName} should be unique.");
        }
        private bool IsUniqueName(string name,int countryId)
        {
             var cityNameInCountrySpecification = new CityNameInCountrySpecification(name,countryId);
             var existingCity = _repository.CountAsync(cityNameInCountrySpecification).Result;
            return existingCity == 0;
        }
    }
}
