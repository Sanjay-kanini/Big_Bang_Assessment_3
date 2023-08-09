using System.ComponentModel.DataAnnotations;

namespace Tours.Models
{
    public class Feedback
    {
        [Key]
        public int feedback_id { get; set; }    
        public int user_id { get; set; }

        public int rating { get; set; }
         
        public string? feedback { get; set; }

        public Add_Tour? Add_Tour { get; set; }

    }
}
