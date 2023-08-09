using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace User_module.Models
{
    public class Payment
    {
        [Key]
        public int transaction_id { get; set; }

        
        public int card_no { get; set; }

        public int cvv_no { get; set; } 
        public int price { get; set; }

        public string? status { get; set; }


        [ForeignKey("Booking")]
        public int booking_id_fk { get; set; }
        public Booking? booking { get; set; }




    }
}
