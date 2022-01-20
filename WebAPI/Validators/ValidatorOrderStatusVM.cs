using DAL;
using DAL.Models;
using FluentValidation;
using WebAPI.Models;
using WebAPI.Specifications;

namespace WebAPI.Validators
{
    public class ValidatorOrderStatusVM : AbstractValidator<OrderStatusVM>
    {
        private readonly IRepository<OrderStatus> _repository;
        public ValidatorOrderStatusVM(IRepository<OrderStatus> repository)
        {
            _repository = repository;

            //Name
            RuleFor(c => c.Status).Cascade(CascadeMode.Stop)
                   .NotEmpty().WithMessage("{PropertyName} is required!")
                   .Length(2, 60).WithMessage("{PropertyName} should be between 2 and 60 characters!")
                   .Must(IsUniqueName).WithMessage("{PropertyName} should be unique.");
        }
        private bool IsUniqueName(string status)
        {
            var orderNameSpecification = new OrderStatusStatusSpecification(status);
            var existingStatus = _repository.CountAsync(orderNameSpecification).Result;
            return existingStatus == 0;
        }
    }
}
