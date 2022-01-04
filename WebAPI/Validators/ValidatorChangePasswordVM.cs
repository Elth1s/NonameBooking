using FluentValidation;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class ValidatorChangePasswordVM : AbstractValidator<ChangePasswordVM>
    {
        public ValidatorChangePasswordVM()
        {
            //OldPassword
            RuleFor(x => x.OldPassword).Cascade(CascadeMode.Stop)
           .NotEmpty().WithMessage("{PropertyName} is required!");

            //Password
            RuleFor(x => x.Password).Cascade(CascadeMode.Stop)
           .NotEmpty().WithMessage("{PropertyName} is required!")
           .MinimumLength(8).WithMessage("{PropertyName} must be at least 8 characters!")
           .Matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$").WithMessage("{PropertyName} must be at least 8 characters and contain one uppercase letter, one lowercase letter, one number and one special character!");

            //ConfirmPassword
            RuleFor(x => x.ConfirmPassword).Cascade(CascadeMode.Stop)
               .NotEmpty().WithName("Confirm Password").WithMessage("{PropertyName} is required!")
                .Equal(x => x.Password).WithMessage("Password and {PropertyName} do not match!");
        }
    }
}
