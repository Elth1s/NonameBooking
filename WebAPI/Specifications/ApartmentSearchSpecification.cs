
using Ardalis.Specification;
using DAL.Models;
using WebAPI.Models;

namespace WebAPI.Specifications
{
    public class ApartmentSearchSpecification : Specification<Apartment>
    {
        public ApartmentSearchSpecification(
            int countryId,
            PriceRange priceRange,
            IEnumerable<int> typesOfApartment,
            IEnumerable<int>? filters,
            int beds,
            int bedrooms,
            int bathrooms
            )
        {
            Query.Include(a => a.City)
                 .Include(a => a.Orders)
                 .Include(a => a.TypeOfApartment)
                 .Include(a => a.Filters)
                 .Include(a => a.Images)
                 .Where(a => a.City.CountryId == countryId)
                 .Where(a => typesOfApartment.Any(t => t == a.TypeOfApartmentId))
                 .Where(a => a.Price >= priceRange.Start && a.Price <= priceRange.End)
                 .Where(a=>a.Beds>=beds)
                 .Where(a=>a.Bedrooms>=bedrooms)
                 .Where(a=>a.Bathrooms>=bathrooms)
                 .AsSplitQuery();

            if (filters != null)
                Query.PostProcessingAction(q => q.Where(a => filters.All(f => a.Filters.Select(af => af.Id).Contains(f))));
        }
        public ApartmentSearchSpecification(
            int cityId,
            PriceRange priceRange,
            IEnumerable<int> typesOfApartment,
            IEnumerable<int>? filters,
            int beds,
            int bedrooms,
            int bathrooms,
            int take,
            int skip)
        {
            Query.Include(a => a.City)
                 .Include(a => a.Orders)
                 .Include(a => a.TypeOfApartment)
                 .Include(a => a.Filters)
                 .Include(a => a.Images)
                 .Where(a => a.CityId == cityId)
                 .Where(a => typesOfApartment.Any(t => t == a.TypeOfApartmentId))
                 .Where(a => a.Price >= priceRange.Start && a.Price <= priceRange.End)
                 .Where(a => a.Beds >= beds)
                 .Where(a => a.Bedrooms >= bedrooms)
                 .Where(a => a.Bathrooms >= bathrooms)
                 .AsSplitQuery();

            if (filters != null)
                Query.PostProcessingAction(q => q.Where(a => filters.All(f => a.Filters.Select(af => af.Id).Contains(f))));

            Query.Skip(skip).Take(take);
        }
    }
}
