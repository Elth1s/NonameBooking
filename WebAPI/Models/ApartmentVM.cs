namespace WebAPI.Models
{
    public class ApartmentVM
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }

        public int TypeOfApartmentId { get; set; }
        public int CityId { get; set; }
        public string OwnerId { get; set; }

        public ApartmentVM(string name, string description, string ownerId)
        {
            Name = name;
            Description = description;
            OwnerId = ownerId;
        }
    }
}
