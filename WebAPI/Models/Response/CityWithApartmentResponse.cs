namespace WebAPI.Models.Response
{
   public class CityApartment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public IEnumerable<string> Images { get; set; }
    }
    public class CityWithApartmentResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<CityApartment> Apartments { get; set; }
    }
}
