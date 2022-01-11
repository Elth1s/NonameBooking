using FluentValidation;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class ValidatorApartmentRequest : AbstractValidator<ApartmentRequest>
    {
        public ValidatorApartmentRequest()
        {
            //Take
            RuleFor(a => a.Take).Cascade(CascadeMode.Stop)
                .GreaterThan(0).When(a => a.Take != null).WithMessage("{PropertyName} must be greater than 0!");

            //Page
            RuleFor(a => a.Page).Cascade(CascadeMode.Stop)
              .GreaterThan(0).When(a => a.Page != null).WithMessage("{PropertyName} must be greater than 0!");
        }
    }

}
