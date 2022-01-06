﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly IFilterService _service;
        public FilterController(IFilterService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateFilter([FromBody] FilterVM model)
        {
            try
            {
                await _service.CreateFilterAsync(model);
                return Ok("Filter successfully created.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> EditFilter(int id, [FromBody] FilterVM model)
        {
            try
            {
                await _service.EditFilterAsync(id, model);
                return Ok("Filter successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteFilter(int id)
        {
            try
            {
                await _service.DeleteFilterAsync(id);
                return Ok("Filter successfully deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-by-id/{id}")]
        public async Task<IActionResult> GetFilterById(int id)
        {
            try
            {
                var _result = await _service.GetFilterByIdAsync(id);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllFilters()
        {
            try
            {
                var _result = await _service.GetAllFiltersAsync();
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Title = ex.Message });
            }
        }
    }
}
