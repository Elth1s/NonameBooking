using DAL;
using DAL.Models;
using FluentValidation;
using WebAPI.Models;
using WebAPI.Specifications;

namespace WebAPI.Validators
{
    public class ValidatorFilterVM : AbstractValidator<FilterVM>
    {
        private readonly IRepository<Filter> _repository;
        public ValidatorFilterVM(IRepository<Filter> repository)
        {
            _repository = repository;

            //Name
            RuleFor(c => c.Name).Cascade(CascadeMode.Stop)
                   .NotEmpty().WithMessage("{PropertyName} is required!")
                   .Length(2, 90).WithMessage("{PropertyName} should be between 2 and 90 characters!")
                   .Must((o, email) => { return IsUniqueName(email, o.FilterGroupId); }).WithMessage("{PropertyName} should be unique.");
        }
        private bool IsUniqueName(string name, int groupId)
        {
            var filterNameInFilterGroupSpecification = new FilterNameInFilterGroupSpecification(name, groupId);
            var existingFilter = _repository.CountAsync(filterNameInFilterGroupSpecification).Result;
            return existingFilter == 0;
        }
    }
}
