using DAL;
using DAL.Models;
using FluentValidation;
using WebAPI.Models;
using WebAPI.Specifications;

namespace WebAPI.Validators
{
    public class ValidatorTypeOfApartmentVM : AbstractValidator<TypeOfApartmentVM>
    {
        private readonly IRepository<TypeOfApartment> _repository;
        public ValidatorTypeOfApartmentVM(IRepository<TypeOfApartment> repository)
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
            var typeOfApartmentNameSpecification = new TypeOfApartmentNameSpecification(name);
            var existingType = _repository.CountAsync(typeOfApartmentNameSpecification).Result;
            return existingType == 0;
        }
    }
}
