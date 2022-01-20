namespace WebAPI.Models
{
    public class ApartmentSearch
    {
        public int CountryId { get; set; }
        public PriceRange? PriceRange { get; set; }
        public DateRange? DateRange { get; set; }
        public IEnumerable<int>? TypesOfApartment { get; set; }
        public IEnumerable<int>? Filters { get; set; }
        public int? Beds { get; set; }
        public int? Bedrooms { get; set; }
        public int? Bathrooms { get; set; }
    }
}
