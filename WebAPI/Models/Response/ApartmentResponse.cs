namespace WebAPI.Models.Response
{
    public class ApartmentResponse:LookupData
    {
        public float Price { get; set; }
        public string TypeOfApartmentName { get; set; }
        public string CityName { get; set; }
        public int Beds { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public IEnumerable<string> FilterName { get; set; }
        public IEnumerable<string> Images { get; set; }


    }
}
