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
            RuleFor(c => c.Start).Cascade(CascadeMode.Stop)
                .NotEmpty().WithName("Start date").WithMessage("{PropertyName} is required!");

            //End
            RuleFor(c => c.End).Cascade(CascadeMode.Stop)
               .NotEmpty().WithName("End date").WithMessage("{PropertyName} is required!")
               .GreaterThan(c => c.Start.Value).When(c => c.Start.HasValue).WithMessage("{PropertyName} must after start date")
               .Must((c,end) => {return IsValidDates(c.ApartmentId, c.Start.Value, end.Value); }).WithMessage("Invalid range of dates.");


        }
        private bool IsValidDates(int apartmentId, DateTime start, DateTime end)
        {
            var orderDateCheckSpecification = new OrderDateCheckSpecification(apartmentId,start,end);
            var existingOrder = _repository.CountAsync(orderDateCheckSpecification).Result;
            return existingOrder == 0;
        }
      
    }
}
