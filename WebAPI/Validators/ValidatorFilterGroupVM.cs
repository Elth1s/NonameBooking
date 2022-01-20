using DAL;
using DAL.Models;
using FluentValidation;
using WebAPI.Models;
using WebAPI.Specifications;

namespace WebAPI.Validators
{
    public class ValidatorFilterGroupVM : AbstractValidator<FilterGroupVM>
    {
        private readonly IRepository<FilterGroup> _repository;
        public ValidatorFilterGroupVM(IRepository<FilterGroup> repository)
        {
            _repository = repository;

            //Name
            RuleFor(c => c.Name).Cascade(CascadeMode.Stop)
                   .NotEmpty().WithMessage("{PropertyName} is required!")
                   .Length(2, 60).WithMessage("{PropertyName} should be between 2 and 60 characters!")
                   .Must(IsUniqueName).WithMessage("{PropertyName} should be unique.");
        }
        private bool IsUniqueName(string name)
        {
            var groupNameSpecification = new FilterGroupNameSpecification(name);
            var existingGroup = _repository.CountAsync(groupNameSpecification).Result;
            return existingGroup == 0;
        }
    }
}
