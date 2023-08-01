using System.ComponentModel.DataAnnotations;

namespace Tours.Models
{
    public class Admin
    {
        [Key]
        public int admin_id { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string? email_id { get; set; }

        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long.")]
        [RegularExpression(@"^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^\da-zA-Z]).{8,}$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, and one special character.")]
        public string? password { get; set; }

    }
}
