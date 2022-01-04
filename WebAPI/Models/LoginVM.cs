namespace WebAPI.Models
{
    public class LoginVM
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public LoginVM(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}
