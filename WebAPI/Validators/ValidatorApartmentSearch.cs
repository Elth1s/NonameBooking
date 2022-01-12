using FluentValidation;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class ValidatorApartmentSearch : AbstractValidator<ApartmentSearch>
    {
        public ValidatorApartmentSearch()
        {
            //DateRange.Start
            RuleFor(a => a.DateRange.Start).Cascade(CascadeMode.Stop)
                .NotEmpty().When(a => a.DateRange != null).WithName("Start date").WithMessage("{PropertyName} is required!")
                .GreaterThanOrEqualTo(a => DateTime.Now.Date).When(a => a.DateRange != null).WithMessage("{PropertyName} must after or equal current date!"); ;

            //DateRange.End
            RuleFor(a => a.DateRange.End).Cascade(CascadeMode.Stop)
                .NotEmpty().When(a => a.DateRange != null).WithName("End date").WithMessage("{PropertyName} is required!")
                .GreaterThan(a => a.DateRange.Start).When(a => a.DateRange != null).WithMessage("{PropertyName} must after start date!");

            //PriceRange.Start
            RuleFor(a => a.PriceRange.Start).Cascade(CascadeMode.Stop)
                .NotEmpty().When(a => a.DateRange != null).WithName("Price start").WithMessage("{PropertyName} is required!");

            //PriceRange.End
            RuleFor(a => a.PriceRange.End).Cascade(CascadeMode.Stop)
                .NotEmpty().When(a => a.DateRange != null).WithName("Price end").WithMessage("{PropertyName} is required!")
                .GreaterThan(a => a.PriceRange.Start).When(a => a.PriceRange != null).WithMessage("{PropertyName} must after start price!");

            //Beds
            RuleFor(a => a.Beds).Cascade(CascadeMode.Stop)
                .NotEmpty().WithName("Beds").WithMessage("{PropertyName} is required!")
                .InclusiveBetween(0, 16).WithMessage("{PropertyName} must be between 0 and 16!");

            //Bedrooms
            RuleFor(a => a.Bedrooms).Cascade(CascadeMode.Stop)
                .NotEmpty().WithName("Beds").WithMessage("{PropertyName} is required!")
                .InclusiveBetween(0, 16).WithMessage("{PropertyName} must be between 0 and 16!");

            //Bathrooms
            RuleFor(a => a.Bathrooms).Cascade(CascadeMode.Stop)
                .NotEmpty().WithName("Beds").WithMessage("{PropertyName} is required!")
                .InclusiveBetween(0, 16).WithMessage("{PropertyName} must be between 0 and 16!");
        }
    }

}
