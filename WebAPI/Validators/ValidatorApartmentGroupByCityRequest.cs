using FluentValidation;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class ValidatorApartmentGroupByCityRequest : AbstractValidator<ApartmentGroupByCityRequest>
    {
        public ValidatorApartmentGroupByCityRequest()
        {
            //TakeCityGroup
            RuleFor(a => a.TakeCityGroup).Cascade(CascadeMode.Stop)
                .GreaterThan(0).When(a => a.TakeCityGroup != null).WithMessage("{PropertyName} must be greater than 0!");

            //TakeCityGroupWithApartment
            RuleFor(a => a.TakeCityGroupWithApartment).Cascade(CascadeMode.Stop)
             .GreaterThan(0).When(a => a.TakeCityGroupWithApartment != null).WithMessage("{PropertyName} must be greater than 0!")
             .LessThanOrEqualTo(a => a.TakeCityGroup).When(a => a.TakeCityGroupWithApartment != null && a.TakeCityGroup != null).WithMessage("{PropertyName} must be less or equal to Take City Group!");

            //TakeApartments
            RuleFor(a => a.TakeApartments).Cascade(CascadeMode.Stop)
                   .GreaterThan(0).When(a => a.TakeApartments != null).WithMessage("{PropertyName} must be greater than 0!");
        }
    }

}
