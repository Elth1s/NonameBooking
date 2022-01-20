using AutoMapper;
using DAL;
using DAL.Models;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;
using WebAPI.Specifications;

namespace WebAPI.Services
{
    public class FilterService : IFilterService
    {
        private readonly IRepository<FilterGroup> _filterGroupRepository;
        private readonly IRepository<Filter> _filterRepository;
        private readonly IMapper _mapper;
        public FilterService(IRepository<FilterGroup> filterGroupRepository, IRepository<Filter> filterRepository, IMapper mapper)
        {
            _filterGroupRepository = filterGroupRepository;
            _filterRepository = filterRepository;
            _mapper = mapper;
        }

        public async Task CreateFilterAsync(FilterVM model)
        {
            var group = await _filterGroupRepository.GetByIdAsync(model.FilterGroupId);
            if (group == null)
                throw new Exception($"Failed to create filter! Filter group with id {model.FilterGroupId} doesn't exist.");

            var filter = _mapper.Map<Filter>(model);
            await _filterRepository.AddAsync(filter);
            await _filterRepository.SaveChangesAsync();
        }

        public async Task EditFilterAsync(int id, FilterVM model)
        {
            var group = await _filterGroupRepository.GetByIdAsync(model.FilterGroupId);
            if (group == null)
                throw new Exception($"Failed to edit filter! Filter group with id {model.FilterGroupId} doesn't exist.");

            var filter = await _filterRepository.GetByIdAsync(id);
            if (filter == null)
                throw new Exception($"Filter with id {id} doesn't exist.");

            filter.Name = model.Name;
            filter.FilterGroupId = model.FilterGroupId;

            await _filterRepository.UpdateAsync(filter);
            await _filterRepository.SaveChangesAsync();
        }

        public async Task DeleteFilterAsync(int id)
        {
            var filter = await _filterRepository.GetByIdAsync(id);
            if (filter == null)
                throw new Exception($"Filter with id {id} doesn't exist.");

            await _filterRepository.DeleteAsync(filter);
            await _filterRepository.SaveChangesAsync();
        }
        public async Task<FilterWithFilterGroupResponse> GetFilterByIdAsync(int id)
        {
            var spec = new FilterIncludeInfoSpecification(id);
            var filter = await _filterRepository.GetBySpecAsync(spec);
            if (filter == null)
                throw new Exception($"Filter with id {id} doesn't exist.");

            var result = _mapper.Map<FilterWithFilterGroupResponse>(filter);
            return result;

        }

        public async Task<IEnumerable<FilterWithFilterGroupResponse>> GetAllFiltersAsync()
        {
            var spec = new FilterIncludeInfoSpecification();
            var filters = await _filterRepository.ListAsync(spec);
            var result = filters.Select(f => _mapper.Map<FilterWithFilterGroupResponse>(f));
            return result;
        }

        public async Task<IEnumerable<FilterResponse>> GetFilterByGroupIdAsync(int groupId)
        {
            var spec = new FilterListByGroupIdSpecification(groupId);
            var filters = await _filterRepository.ListAsync(spec);
            var result = filters.Select(f => _mapper.Map<FilterResponse>(f));
            return result;
        }
    }
}
