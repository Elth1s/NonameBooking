using AutoMapper;
using DAL;
using DAL.Models;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Services
{
    public class FilterGroupService : IFilterGroupService
    {
        private readonly IRepository<FilterGroup> _repository;
        private readonly IMapper _mapper;
        public FilterGroupService(IRepository<FilterGroup> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task CreateFilterGroupAsync(FilterGroupVM model)
        {
            var group = _mapper.Map<FilterGroup>(model);
            await _repository.AddAsync(group);
            await _repository.SaveChangesAsync();
        }

        public async Task EditFilterGroupAsync(int id, FilterGroupVM model)
        {
            var group = await _repository.GetByIdAsync(id);
            if (group == null)
                throw new Exception($"Filter group with id {id} doesn't exist.");

            group.Name = model.Name;

            await _repository.UpdateAsync(group);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteFilterGroupAsync(int id)
        {
            var group = await _repository.GetByIdAsync(id);
            if (group == null)
                throw new Exception($"Filter group with id {id} doesn't exist.");

            await _repository.DeleteAsync(group);
            await _repository.SaveChangesAsync();
        }

        public async Task<IEnumerable<FilterGroupResponse>> GetAllFilterGroupsAsync()
        {
            var groups = await _repository.ListAsync();
            var result = groups.Select(f => _mapper.Map<FilterGroupResponse>(f));
            return result;
        }
    }
}
