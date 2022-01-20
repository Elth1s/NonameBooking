namespace WebAPI.Models
{
    public class RegisterVM
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public RegisterVM(string name, string surname, string phone, string email, string password, string confirmPassword)
        {
            Name = name;
            Surname = surname;
            Phone = phone;
            Email = email;
            Password = password;
            ConfirmPassword = confirmPassword;
        }

    }
}
