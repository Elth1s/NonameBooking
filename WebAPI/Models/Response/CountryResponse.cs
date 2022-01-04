namespace WebAPI.Models.Response
{
    public class CountryResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public CountryResponse(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
