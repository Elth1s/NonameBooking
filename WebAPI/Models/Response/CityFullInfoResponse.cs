namespace WebAPI.Models.Response
{
    public class CityFullInfoResponse: LookupData
    {
        public int CountryId { get; set; }

        public CityFullInfoResponse(int id, string name, int countryId)
        {
            Id = id;
            Name = name;
            CountryId = countryId;
        }
    }
}
