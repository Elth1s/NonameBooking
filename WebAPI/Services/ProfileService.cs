﻿using AutoMapper;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public ProfileService(IMapper mapper, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task ChangePasswordAsync(string id, ChangePasswordVM model)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new Exception($"User with id {id} doesn't exist.");

            if (!await _userManager.CheckPasswordAsync(user, model.OldPassword))
                throw new Exception("Invalid password.");

            var resultPasswordUpdate = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
            if (!resultPasswordUpdate.Succeeded)
                throw new Exception("Updating password failed.");
        }

        public async Task EditProfileAsync(string id, UserVM model)
        {
            var user=await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new Exception($"User with id {id} doesn't exist.");

            if (model.Photo != null)
            {
                string randomFilename = Path.GetRandomFileName() +
                    Path.GetExtension(model.Photo.FileName);

                string dirPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                string fileName = Path.Combine(dirPath, randomFilename);
                using (var file = System.IO.File.Create(fileName))
                {
                    model.Photo.CopyTo(file);
                }
                user.Photo = randomFilename;
            }
            user.Name = model.Name;
            user.Surname = model.Surname;
            user.PhoneNumber = model.Phone;

            var resultUserUpdate = await _userManager.UpdateAsync(user);
            if (!resultUserUpdate.Succeeded)
                throw new Exception("Updating user failed.");
        }

        public async Task<UserResponse> GetProfileAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new Exception($"User with id {id} doesn't exist.");

            var result = _mapper.Map<UserResponse>(user);
            return result;
        }
    }
}
