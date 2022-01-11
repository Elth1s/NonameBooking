namespace WebAPI.Models
{
    public class CityVM
    {
        public string Name { get; set; }
        public int CountryId { get; set; }
        public IFormFile? Image { get; set; }

    }
}
