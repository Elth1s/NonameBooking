﻿using AutoMapper;
using DAL;
using DAL.Models;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;

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

        public async Task<IEnumerable<FilterResponse>> GetAllFiltersAsync()
        {
            var filters = await _filterRepository.ListAsync();
            var result = filters.Select(f => _mapper.Map<FilterResponse>(f));
            return result;
        }
    }
}
