namespace WebAPI.Models.Response
{
    public class ApartmentShortInfoResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string TypeOfApartmentName { get; set; }
        public string CityName { get; set; }
    }
}
