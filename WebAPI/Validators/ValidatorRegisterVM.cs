using DAL.Models;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public partial class ValidatorRegisterVM : AbstractValidator<RegisterVM>
    {
        private readonly UserManager<AppUser> _userManager;
        public ValidatorRegisterVM(UserManager<AppUser> userManager)
        {
            _userManager = userManager;

            //Name
            RuleFor(x => x.Name).Cascade(CascadeMode.Stop)
               .NotEmpty().WithMessage("{PropertyName} is required!")
               .Length(2, 15).WithMessage("{PropertyName} should be between 2 and 15 characters!");

            //Surname
            RuleFor(x => x.Surname).Cascade(CascadeMode.Stop)
              .NotEmpty().WithMessage("{PropertyName} is required!")
              .Length(2, 40).WithMessage("{PropertyName} should be between 2 and 40 characters!");

            //Phone
            RuleFor(x => x.Phone).Cascade(CascadeMode.Stop)
              .NotEmpty().WithName("Phone number").WithMessage("{PropertyName} is required!")
              .Matches(@"^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$").WithMessage("Invalid format of {PropertyName}!");

            //Email
            RuleFor(x => x.Email).Cascade(CascadeMode.Stop)
               .NotEmpty().WithName("Email address").WithMessage("{PropertyName} is required!")
               .EmailAddress().WithMessage("Invalid format of {PropertyName}!")
               .Must(IsUniqueEmail).WithMessage("User with this {PropertyName} already exists!");

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
        private bool IsUniqueEmail(string email)
        {
            return _userManager.FindByEmailAsync(email).Result == null;
        }
    }
}
