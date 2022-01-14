using DAL;
using DAL.Models;
using FluentValidation;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class ValidatorApartmentVM : AbstractValidator<ApartmentVM>
    {
        public ValidatorApartmentVM()
        {

            //Name
            RuleFor(c => c.Name).Cascade(CascadeMode.Stop)
                   .NotEmpty().WithMessage("{PropertyName} is required!")
                   .Length(2, 90).WithMessage("{PropertyName} should be between 2 and 90 characters!");

            //Description
            RuleFor(c => c.Description).Cascade(CascadeMode.Stop)
                .MaximumLength(250).WithMessage("{PropertyName} max length 250 characters!");

            //Address
            RuleFor(a => a.Address).Cascade(CascadeMode.Stop)
                .NotEmpty().WithName("Address").WithMessage("{PropertyName} is required!")
                .MaximumLength(250).WithMessage("{PropertyName} max length 250 characters!"); ;

            //Price
            RuleFor(c => c.Price).Cascade(CascadeMode.Stop)
               .InclusiveBetween(0.1f, 10_000_000f).WithMessage("{PropertyName} should be beetween 0.1 and 10 000 000");

            //Beds
            RuleFor(a => a.Beds).Cascade(CascadeMode.Stop)
                .NotEmpty().WithName("Beds").WithMessage("{PropertyName} is required!")
                .InclusiveBetween(1, 16).WithMessage("{PropertyName} must be between 1 and 16!");

            //Bedrooms
            RuleFor(a => a.Bedrooms).Cascade(CascadeMode.Stop)
                .NotEmpty().WithName("Beds").WithMessage("{PropertyName} is required!")
                .InclusiveBetween(1, 16).WithMessage("{PropertyName} must be between 1 and 16!");

            //Bathrooms
            RuleFor(a => a.Bathrooms).Cascade(CascadeMode.Stop)
                .NotEmpty().WithName("Beds").WithMessage("{PropertyName} is required!")
                .InclusiveBetween(1, 16).WithMessage("{PropertyName} must be between 1 and 16!");



        }
    }
}
