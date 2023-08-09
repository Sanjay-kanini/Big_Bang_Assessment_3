using System.ComponentModel.DataAnnotations;

namespace User_module.Models
{
    public class User
    {
        [Key]
        public int user_id { get;set; }

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string? email_id { get;set; }

        //[StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long.")]
        //[RegularExpression(@"^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^\da-zA-Z]).{8,}$",
        //    ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, and one special character.")]
        public string? password { get;set; }
        public string? user_name { get; set; }

        [DataType(DataType.Date)]
        public DateTime dob { get; set; }
        public string? gender { get; set; }  
        public string? address { get; set; }
        //[StringLength(10, ErrorMessage = "Phone number cannot contain more than 10 digits.")]
        public long phone_no { get; set; }

        public ICollection<Booking>? bookings { get; set; }

        public ICollection<Payment>? payment { get; set; }

        


    }
}
