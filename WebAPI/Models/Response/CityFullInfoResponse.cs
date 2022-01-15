namespace WebAPI.Models.Response
{
    public class CityFullInfoResponse: LookupData
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string Image { get; set; }
    }
}
