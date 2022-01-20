using FluentValidation;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class ValidatorApartmentRequest : AbstractValidator<ApartmentRequest>
    {
        public ValidatorApartmentRequest()
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
                .InclusiveBetween(0, 16).WithName("Beds").WithMessage("{PropertyName} must be between 0 and 16!")
                .When(a => a.Beds.HasValue);

            //Bedrooms
            RuleFor(a => a.Bedrooms).Cascade(CascadeMode.Stop)
                .InclusiveBetween(0, 16).WithName("Bedrooms").WithMessage("{PropertyName} must be between 0 and 16!")
                .When(a => a.Bedrooms.HasValue);

            //Bathrooms
            RuleFor(a => a.Bathrooms).Cascade(CascadeMode.Stop)
                .InclusiveBetween(0, 16).WithName("Bathrooms").WithMessage("{PropertyName} must be between 0 and 16!")
                .When(a => a.Bathrooms.HasValue);

            //Take
            RuleFor(a => a.Take).Cascade(CascadeMode.Stop)
                .GreaterThan(0).When(a => a.Take != null).WithMessage("{PropertyName} must be greater than 0!");

            //Page
            RuleFor(a => a.Page).Cascade(CascadeMode.Stop)
              .GreaterThan(0).When(a => a.Page != null).WithMessage("{PropertyName} must be greater than 0!");
        }
    }

}
