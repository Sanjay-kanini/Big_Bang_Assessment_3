using System.ComponentModel.DataAnnotations;
using Tours.Interface;

namespace Tours.Models
{
    public class Add_Tour
    {
        [Key]
        public int tour_id { get; set; }    

        public string? tour_name { get; set; }

        public string? tour_location { get; set; }   
        public string? country { get; set; }

        public int? tour_duration_days { get;set; }  
        public int? tour_duration_nights { get; set; }
        public string? tour_type { get; set; }

        public int? tour_price { get; set; }

        public string? nearby_hotels { get; set; }
        public int? costfor_two { get; set; }
        public string? hotel_cusine { get; set; }

        public string? hotel_image { get; set; }
        public  Tour_agency? tour_Agency { get; set; }
        public ICollection<Itinerary>? itinerarys { get; set; }

        public ICollection<Feedback>? feedbacks { get; set; }

    }
}
