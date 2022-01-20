using FluentValidation;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class ValidatorLoginVM : AbstractValidator<LoginVM>
    {
        public ValidatorLoginVM()
        {
            //Email
            RuleFor(x => x.Email).Cascade(CascadeMode.Stop)
                   .NotEmpty().WithName("Email address").WithMessage("{PropertyName} is required!")
                   .EmailAddress().WithMessage("Invalid format of {PropertyName}!");

            //Password
            RuleFor(x => x.Password).Cascade(CascadeMode.Stop)
           .NotEmpty().WithMessage("{PropertyName} is required!")
           .MinimumLength(8).WithMessage("{PropertyName} must be at least 8 characters!");

        }
    }
}
