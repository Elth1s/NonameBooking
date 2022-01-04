namespace WebAPI.Models.Response
{
    public class DateRange
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
    public class ApartmentResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
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
        public IEnumerable<DateRange> Dates { get; set; }

    }
}
