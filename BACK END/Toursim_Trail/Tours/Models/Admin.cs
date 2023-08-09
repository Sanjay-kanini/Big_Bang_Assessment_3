using System.ComponentModel.DataAnnotations;

namespace Tours.Models
{
    public class Admin
    {
        [Key]
        public int admin_id { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string email_id { get; set; }

        [Required(ErrorMessage = "*")]

        [MaxLength(20, ErrorMessage = "Password should be longer than 8 characters.and a special character ")]
        public string password { get; set; }

    }
}
