namespace WebAPI.Models
{
    public class CountryVM
    {
        public string Name { get; set; }
        public CountryVM(string name)
        {
            Name = name;
        }
    }
}
