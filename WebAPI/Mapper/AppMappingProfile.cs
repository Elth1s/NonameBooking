using AutoMapper;
using DAL.Models;
using WebAPI.Models;

namespace WebAPI.Mapper
{
    public class AppMappingProfile: Profile
    {
        public AppMappingProfile()
        {
            CreateMap<RegisterVM, AppUser>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(vm => vm.Email));
        }
    }
}
