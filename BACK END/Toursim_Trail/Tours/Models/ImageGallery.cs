using System.ComponentModel.DataAnnotations;

namespace Tours.Models
{
    public class ImageGallery
    {
        [Key]
        public int image_id { get; set; }   
        public string? Carousel { get; set; }

    }
}
