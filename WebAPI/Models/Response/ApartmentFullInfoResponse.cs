namespace WebAPI.Models.Response
{

    public class ApartmentFullInfoResponse: LookupData
    {
        public string Description { get; set; }
        public float Price { get; set; }
        public int TypeOfApartmentId{ get; set; }
        public string TypeOfApartmentName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string OwnerId { get; set; }
        public string OwnerFullName { get; set; }
        public int Beds { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public IEnumerable<DateRange> Dates { get; set; }
        public IEnumerable<string> Images { get; set; }
        public IEnumerable<FilterGroupWithFiltersResponse> FilterGroupWithFilters { get; set; }
    }
}
