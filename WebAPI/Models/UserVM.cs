namespace WebAPI.Models
{
    public class UserVM
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public IFormFile? Photo { get; set; }

    }
}
