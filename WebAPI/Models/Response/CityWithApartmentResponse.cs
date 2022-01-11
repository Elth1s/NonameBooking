namespace WebAPI.Models.Response
{
   public class CityApartment:LookupData
    {
        public float Price { get; set; }
        public IEnumerable<string> Images { get; set; }
    }
    public class CityWithApartmentResponse:LookupData
    {
        public string Image { get; set; }
        public IEnumerable<CityApartment>? Apartments { get; set; }
    }
}
