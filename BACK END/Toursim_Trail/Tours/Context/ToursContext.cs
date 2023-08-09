using Microsoft.EntityFrameworkCore;
using Tours.Models;

namespace Tours.Context
{
    public class ToursContext:DbContext
    {
        public DbSet<Add_Tour> Add_Tours { get; set; }
        public DbSet<Tour_agency> Tour_agency { get; set; } 
        public DbSet<Itinerary> Itineraries { get; set; }   
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Admin> Admins { get; set; }   
        
        public DbSet<ImageGallery> ImageGallery { get; set; }


        public ToursContext(DbContextOptions<ToursContext> options) : base(options) { }

    }
}
