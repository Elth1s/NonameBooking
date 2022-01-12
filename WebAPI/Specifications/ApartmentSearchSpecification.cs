
using Ardalis.Specification;
using DAL.Models;
using WebAPI.Constants;
using WebAPI.Models;

namespace WebAPI.Specifications
{
    public class ApartmentSearchSpecification : Specification<Apartment>
    {
        public ApartmentSearchSpecification(
            int countryId,
            PriceRange priceRange,
            DateRange dateRange,
            IEnumerable<int>? typesOfApartment,
            IEnumerable<int>? filters,
            int beds,
            int bedrooms,
            int bathrooms
            )
        {
            Query.Include(a => a.City)
                 .Include(a => a.Orders)
                 .ThenInclude(o => o.OrderStatus)
                 .Include(a => a.TypeOfApartment)
                 .Include(a => a.Filters)
                 .Include(a => a.Images)
                 .Where(a => a.City.CountryId == countryId)
                 .Where(a => a.Price >= priceRange.Start && a.Price <= priceRange.End)
                 .Where(a => a.Orders.All(o => o.OrderStatus.Status == OrderStatuses.Canceled ||
                                                dateRange.Start.Date < o.Start.Date ||
                                                dateRange.End.Date > o.End.Date))
                 .Where(a=>a.Beds>=beds)
                 .Where(a=>a.Bedrooms>=bedrooms)
                 .Where(a=>a.Bathrooms>=bathrooms)
                 .AsSplitQuery();

            if (typesOfApartment != null)
                Query.Where(a => typesOfApartment.Any(t => t == a.TypeOfApartmentId));


            if (filters != null)
                Query.PostProcessingAction(q => q.Where(a => filters.All(f => a.Filters.Select(af => af.Id).Contains(f))));
        }
        public ApartmentSearchSpecification(
            int cityId,
            PriceRange priceRange,
             DateRange dateRange,
            IEnumerable<int>? typesOfApartment,
            IEnumerable<int>? filters,
            int beds,
            int bedrooms,
            int bathrooms,
            int take,
            int skip)
        {
            Query.Include(a => a.City)
                 .Include(a => a.Orders)
                 .ThenInclude(o=>o.OrderStatus)
                 .Include(a => a.TypeOfApartment)
                 .Include(a => a.Filters)
                 .Include(a => a.Images)
                 .Where(a => a.CityId == cityId)
                 .Where(a => a.Price >= priceRange.Start && a.Price <= priceRange.End)
                 .Where(a => a.Orders.All(o =>o.OrderStatus.Status==OrderStatuses.Canceled ||
                                                dateRange.Start.Date < o.Start.Date || 
                                                dateRange.End.Date > o.End.Date))
                 .Where(a => a.Beds >= beds)
                 .Where(a => a.Bedrooms >= bedrooms)
                 .Where(a => a.Bathrooms >= bathrooms)
                 .AsSplitQuery();

            if (typesOfApartment != null)
                Query.Where(a => typesOfApartment.Any(t => t == a.TypeOfApartmentId));

            if (filters != null)
                Query.PostProcessingAction(q => q.Where(a => filters.All(f => a.Filters.Select(af => af.Id).Contains(f))));

            Query.Skip(skip).Take(take);
        }
    }
}
