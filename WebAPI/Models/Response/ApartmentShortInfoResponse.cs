namespace WebAPI.Models.Response
{
    public class ApartmentShortInfoResponse:LookupData
    {
        public float Price { get; set; }
        public string TypeOfApartmentName { get; set; }
        public string CityName { get; set; }
        public IEnumerable<string> FilterName { get; set; }
    }
}
