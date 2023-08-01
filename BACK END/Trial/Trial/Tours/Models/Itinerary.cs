using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.ComponentModel.DataAnnotations;

namespace Tours.Models
{
    public class Itinerary
    {
        [Key]
        public int? itinerary_id { get; set; }

        public int? day { get; set; }
        public string? location { get;set; }
        public string? description { get; set; }

        public string? location_image { get; set; }

        public Add_Tour? Add_Tour { get; set; }

    }
}
