using AutoMapper;
using DAL.Models;
using WebAPI.Models;
using WebAPI.Models.Response;

namespace WebAPI.Mapper
{
    public class AppMappingProfile: Profile
    {
        public AppMappingProfile()
        {
            //User
            CreateMap<RegisterVM, AppUser>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(vm => vm.Email))
                .ForMember(u=>u.PhoneNumber,opt=>opt.MapFrom(vm=>vm.Phone));
                

            CreateMap<AppUser, UserResponse>()
               .ForMember(ur => ur.Photo,opt => opt.MapFrom(u => @"/images/" + u.Photo))
               .ForMember(ur=>ur.Phone,opt=>opt.MapFrom(u=>u.PhoneNumber));

            //Country
            CreateMap<CountryVM, Country>();

            CreateMap<Country, CountryResponse>();

            //City
            CreateMap<CityVM, City>();

            CreateMap<City, CityResponse>();

            //TypeOfApartment
            CreateMap<TypeOfApartmentVM, TypeOfApartment>();

            CreateMap<TypeOfApartment, TypeOfApartmentResponse>();

            //Apartment
            CreateMap<ApartmentVM, Apartment>();

            CreateMap<Apartment, ApartmentResponse>()
              .ForMember(ar => ar.OwnerFullName, opt => opt.MapFrom(a => a.Owner.Name + " " + a.Owner.Surname))
              .ForMember(ar => ar.TypeOfApartmentName, opt => opt.MapFrom(a => a.TypeOfApartment.Name))
              .ForMember(ar => ar.CityName, opt => opt.MapFrom(a => a.City.Name))
              .ForMember(ar => ar.CountryId, opt => opt.MapFrom(a => a.City.CountryId))
              .ForMember(ar => ar.CountryName, opt => opt.MapFrom(a => a.City.Country.Name))
              .ForMember(ar=>ar.Dates,opt=>opt.MapFrom(a=>a.Orders.Select(o=>new DateRange{Start= o.Start,End=o.End })));

            CreateMap<Apartment, ApartmentShortInfoResponse>()

             .ForMember(ar => ar.TypeOfApartmentName, opt => opt.MapFrom(a => a.TypeOfApartment.Name))
             .ForMember(ar => ar.CityName, opt => opt.MapFrom(a => a.City.Name));

            //FilterGroup
            CreateMap<FilterGroupVM, FilterGroup>();

            CreateMap<FilterGroup, FilterGroupResponse>();

            //Filter
            CreateMap<FilterVM, Filter>();

            CreateMap<Filter, FilterResponse>();

            //OrderStatus
            CreateMap<OrderStatusVM, OrderStatus>();

            CreateMap<OrderStatus, OrderStatusResponse>();

            //Order
            CreateMap<OrderVM, Order>();

            CreateMap<Order, OrderResponse>()
                .ForMember(or => or.UserFullName, opt => opt.MapFrom(o => o.User.Name + " " + o.User.Surname))
                .ForMember(or => or.ApartmentName, opt => opt.MapFrom(o => o.Apartment.Name))
                .ForMember(or => or.OrderStatusName, opt => opt.MapFrom(o => o.OrderStatus.Status));
        }
    }
}
