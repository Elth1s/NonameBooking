using DAL.Models;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public partial class ValidatorRegisterVM
    {
        public class ValidatorUserVM : AbstractValidator<UserVM>
        {
            public ValidatorUserVM()
            {

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
            
                
            }
        }

    }
}
