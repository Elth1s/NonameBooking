namespace WebAPI.Models.Response
{
    public class TypeOfApartmentResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public TypeOfApartmentResponse(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
