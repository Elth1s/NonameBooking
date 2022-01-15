namespace WebAPI.Models.Response
{
    public class CityWithApartmentsWithCountResponse 
    {
        public int Count { get; set; }
        public string CityName { get; set; }
        public IEnumerable<ApartmentResponse> Apartments { get; set; }

    }
}
