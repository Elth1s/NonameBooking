using Ardalis.Specification;
using DAL;
using DAL.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Specifications;

namespace WebAPI.Validators
{
    public class ValidatorCountryVM : AbstractValidator<CountryVM>
    {
        private readonly IRepository<Country> _repository;
        public ValidatorCountryVM(IRepository<Country> repository)
        {       
            _repository = repository;

            //Name
            RuleFor(c => c.Name).Cascade(CascadeMode.Stop)
                   .NotEmpty().WithMessage("{PropertyName} is required!")
                   .Length(2, 60).WithMessage("{PropertyName} should be between 2 and 60 characters!")
                   .Must(IsUniqueName).WithMessage("{PropertyName} should be unique.");
        }
        private bool IsUniqueName(string name)
        {
            var countryNameSpecification = new CountryNameSpecification(name);
            var existingCountry = _repository.CountAsync(countryNameSpecification).Result;
            return existingCountry == 0;
        }
    }
}
