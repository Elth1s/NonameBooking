﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterGroupController : ControllerBase
    {
        private readonly IFilterGroupService _service;
        public FilterGroupController(IFilterGroupService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateFilterGroup([FromBody] FilterGroupVM model)
        {
            try
            {
                await _service.CreateFilterGroupAsync(model);
                return Ok("Filter group successfully created.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = ex.Message });
            }
        }

        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> EditFilterGroup(int id, [FromBody] FilterGroupVM model)
        {
            try
            {
                await _service.EditFilterGroupAsync(id, model);
                return Ok("Filter group successfully edited.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteFilterGroup(int id)
        {
            try
            {
                await _service.DeleteFilterGroupAsync(id);
                return Ok("Filter group successfully deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = ex.Message });
            }
        }
        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllFilterGroups()
        {
            try
            {
                var _result = await _service.GetAllFilterGroupsAsync();
                return Ok(_result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = ex.Message });
            }
        }
    }
}
