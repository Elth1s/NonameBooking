namespace WebAPI.Models.Response
{
    public class CityResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }

        public CityResponse(int id, string name, int countryId)
        {
            Id = id;
            Name = name;
            CountryId = countryId;
        }
    }
}
