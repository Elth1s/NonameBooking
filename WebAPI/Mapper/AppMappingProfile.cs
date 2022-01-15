using AutoMapper;
using DAL.Models;
using WebAPI.Constants;
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
                .ForMember(u => u.PhoneNumber, opt => opt.MapFrom(vm => vm.Phone));
                

            CreateMap<AppUser, UserResponse>()
               .ForMember(ur => ur.Photo,opt => opt.MapFrom(u => Path.Combine(ImagePath.UsersImagePath, u.Photo) ))
               .ForMember(ur=>ur.Phone,opt=>opt.MapFrom(u=>u.PhoneNumber));

            //Country
            CreateMap<CountryVM, Country>();

            CreateMap<Country, CountryResponse>();

            //City
            CreateMap<CityVM, City>()
                .ForMember(cvm => cvm.Image, opt => opt.Ignore()); ;

            CreateMap<City, CityFullInfoResponse>()
            .ForMember(c => c.Image, opt => opt.MapFrom(u => Path.Combine(ImagePath.CitiesImagePath, u.Image)))
            .ForMember(c=>c.CountryName,opt=>opt.MapFrom(c=>c.Country.Name));

            CreateMap<City, CityResponse>();

            //TypeOfApartment
            CreateMap<TypeOfApartmentVM, TypeOfApartment>();

            CreateMap<TypeOfApartment, TypeOfApartmentResponse>();

            //Apartment
            CreateMap<ApartmentVM, Apartment>()
                .ForMember(avm=>avm.Images,opt=>opt.Ignore());


            CreateMap<Apartment, ApartmentFullInfoResponse>()
              .ForMember(ar => ar.OwnerFullName, opt => opt.MapFrom(a => a.Owner.Name + " " + a.Owner.Surname))
              .ForMember(ar => ar.TypeOfApartmentName, opt => opt.MapFrom(a => a.TypeOfApartment.Name))
              .ForMember(ar => ar.CityName, opt => opt.MapFrom(a => a.City.Name))
              .ForMember(ar => ar.CountryId, opt => opt.MapFrom(a => a.City.CountryId))
              .ForMember(ar => ar.CountryName, opt => opt.MapFrom(a => a.City.Country.Name))
              .ForMember(ar => ar.Dates, opt => opt.MapFrom(a => a.Orders.Select(o => new DateRange { Start = o.Start, End = o.End })))
              .ForMember(ar => ar.Images, opt => opt.MapFrom(a => a.Images.Select(i => Path.Combine(ImagePath.ApartmentsImagePath, i.Name))))
              .ForMember(ar=>ar.FilterGroupWithFilters,opt=>opt.MapFrom(a=>a.Filters.GroupBy(f=>new { f.FilterGroup }).Select(f=>new FilterGroupWithFiltersResponse() { Id=f.Key.FilterGroup.Id, Name = f.Key.FilterGroup.Name, Filters= f.Select(f => new FilterResponse { Id=f.Id,Name= f.Name}) })));

            CreateMap<Apartment, ApartmentResponse>()
             .ForMember(ar => ar.TypeOfApartmentName, opt => opt.MapFrom(a => a.TypeOfApartment.Name))
             .ForMember(ar => ar.CityName, opt => opt.MapFrom(a => a.City.Name))
             .ForMember(ar => ar.Images, opt => opt.MapFrom(a => a.Images.Select(i => Path.Combine(ImagePath.ApartmentsImagePath, i.Name))))
             .ForMember(ar=>ar.FilterName,opt=>opt.MapFrom(a=>a.Filters.Select(f=>f.Name)));

            CreateMap<Apartment, CityApartment>()
              .ForMember(ca => ca.Images, opt => opt.MapFrom(a=> a.Images.Select(i => Path.Combine(ImagePath.ApartmentsImagePath, i.Name))));

            //FilterGroup
            CreateMap<FilterGroupVM, FilterGroup>();

            CreateMap<FilterGroup, FilterGroupResponse>();

            CreateMap<FilterGroup, FilterGroupWithFiltersResponse>()
                .ForMember(r=>r.Filters,opt=>opt.MapFrom(g=> g.Filters.Select(f=>new FilterResponse() {Id=f.Id, Name=f.Name })));


            //Filter
            CreateMap<FilterVM, Filter>();

            CreateMap<Filter, FilterWithFilterGroupResponse>()
                .ForMember(f=>f.FilterGroupName,opt=>opt.MapFrom(r=>r.FilterGroup.Name));

            //OrderStatus
            CreateMap<OrderStatusVM, OrderStatus>();

            CreateMap<OrderStatus, OrderStatusResponse>();

            //Order
            CreateMap<OrderVM, Order>();

            CreateMap<Order, OrderResponse>()
               .ForMember(or => or.ApartmentName, opt => opt.MapFrom(o => o.Apartment.Name))
               .ForMember(or => or.OrderStatusName, opt => opt.MapFrom(o => o.OrderStatus.Status));

            CreateMap<Order, OrderFullInfoResponse>()
                .ForMember(or => or.UserFullName, opt => opt.MapFrom(o => o.User.Name + " " + o.User.Surname))
                .ForMember(or => or.ApartmentName, opt => opt.MapFrom(o => o.Apartment.Name))
                .ForMember(or => or.OrderStatusName, opt => opt.MapFrom(o => o.OrderStatus.Status));
        }
    }
}
