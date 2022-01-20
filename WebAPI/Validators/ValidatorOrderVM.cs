using DAL;
using DAL.Models;
using FluentValidation;
using WebAPI.Models;
using WebAPI.Specifications;

namespace WebAPI.Validators
{
    public class ValidatorOrderVM : AbstractValidator<OrderVM>
    {
        private readonly IRepository<Order> _repository;
        public ValidatorOrderVM(IRepository<Order> repository)
        {
            _repository = repository;


            //Start
            RuleFor(o => o.Start).Cascade(CascadeMode.Stop)
                .NotEmpty().WithName("Start date").WithMessage("{PropertyName} is required!");

            //End
            RuleFor(o => o.End).Cascade(CascadeMode.Stop)
               .NotEmpty().WithName("End date").WithMessage("{PropertyName} is required!")
               .GreaterThan(o => o.Start.Value).When(o => o.Start.HasValue).WithMessage("{PropertyName} must after start date")
               .Must((o,end) => {return IsValidDates(o.ApartmentId, o.Start.Value, end.Value); }).WithMessage("Invalid range of dates.");

            //Total
            RuleFor(o => o.Total).NotEmpty().WithName("Total").WithMessage("{PropertyName} is required!")
                .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0!");

        }
        private bool IsValidDates(int apartmentId, DateTime start, DateTime end)
        {
            var orderDateCheckSpecification = new OrderDateCheckSpecification(apartmentId,start,end);
            var existingOrder = _repository.CountAsync(orderDateCheckSpecification).Result;
            return existingOrder == 0;
        }
      
    }
}
