namespace WebAPI.Models
{
    public class PriceRange
    {
        public float? Start { get; set; }
        public float? End { get; set; }
    }
    public class ApartmentsRequest
    {
        public int CountryId { get; set; }
        public PriceRange? PriceRange { get; set; }
        public DateRange? DateRange { get; set; }
        public IEnumerable<int>? TypesOfApartment { get; set; }
        public IEnumerable<int>? Filters { get; set; }
    }
}
