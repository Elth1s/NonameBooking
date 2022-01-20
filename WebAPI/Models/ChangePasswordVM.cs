namespace WebAPI.Models
{
    public class ChangePasswordVM
    {
        public string OldPassword { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
