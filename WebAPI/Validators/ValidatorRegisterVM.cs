using DAL.Models;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class ValidatorRegisterVM : AbstractValidator<RegisterVM>
    {
        private readonly UserManager<AppUser> _userManager;
        public ValidatorRegisterVM(UserManager<AppUser> userManager)
        {
            _userManager = userManager;

            //Name
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("{PropertyName} is required!")
               .Length(2,15).WithMessage("{PropertyName} should be between 2 and 15 characters!");

            //Surname
            RuleFor(x => x.Surname)
              .NotEmpty().WithMessage("{PropertyName} is required!")
              .Length(2, 40).WithMessage("Surname should be between 2 and 40 characters!");

            //Phone
            RuleFor(x => x.Phone)
              .NotEmpty().WithMessage("Phone number is required!")
              .Matches(@"^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$").WithMessage("Invalid format of phone number!");

            //Email
            RuleFor(x => x.Email)
               .NotEmpty().WithMessage("Email address is required!")
               .EmailAddress().WithMessage("Invalid format of email address!")
               .DependentRules(() =>
               {
                   RuleFor(x => x.Email).Must(IsUniqueEmail).WithMessage("User with this email address already exists!");
               });

            //Password
            RuleFor(x => x.Password)
           .NotEmpty().WithName("Password").WithMessage("Password is required!")
           .MinimumLength(8).WithName("Password").WithMessage("Password must be at least 8 characters!")
           .Matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$").WithMessage("Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, one number and one special character!");

            //ConfirmPassword
            RuleFor(x => x.ConfirmPassword)
               .NotEmpty().WithName("ConfirmPassword").WithMessage("Confirm password is required!")
                .Equal(x => x.Password).WithMessage("Password and Confirm password do not match!");


        }
        private bool IsUniqueEmail(string email)
        {
            return _userManager.FindByEmailAsync(email).Result == null;
        }
    }

}
