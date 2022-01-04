namespace WebAPI.Models
{
    public class CityVM
    {
        public string Name { get; set; }
        public int CountryId { get; set; }

        public CityVM(string name, int countryId)
        {
            Name = name;
            CountryId = countryId;
        }
    }
}
