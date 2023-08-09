using System.ComponentModel.DataAnnotations;

namespace User_module.Models
{
    public class Payment
    {
        [Key]
        public int transaction_id { get;set; }

        public int card_no { get; set; }
        public int price { get; set; }  

        public string? status { get; set; }

        public Payment? payment { get; set; }

        public User? user { get; set; }

    }
}
