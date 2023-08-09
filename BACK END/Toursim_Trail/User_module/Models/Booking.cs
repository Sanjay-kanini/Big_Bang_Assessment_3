using System.ComponentModel.DataAnnotations;

namespace User_module.Models
{
    public class Booking
    {
        [Key]
        public int booking_id { get; set; }
        public string? email_id { get; set; }
         public string? name { get; set; }
        public long phone_no { get; set; }

       public int tour_id { get; set; }    //acts as a foreign key

        [DataType(DataType.Date)]
        public DateTime date_of_travel { get; set; }

        public int no_of_person { get;set; }
        public string? vacation_type { get; set; }   
        public string? price { get; set; }   
        public string? status { get; set; }

        public Booking? booking { get; set; }

        public User? user { get;set; }


    }
}
