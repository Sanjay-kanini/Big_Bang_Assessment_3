
using Microsoft.EntityFrameworkCore;
using User_module.Models;

namespace User_module.Context
{
    public class UserContext:DbContext
    {
        public DbSet<User>Users { get; set; }   
        public DbSet<Payment> Payments { get; set; } 

        public DbSet<Booking> Bookings { get; set; }    


      public UserContext(DbContextOptions options): base(options) { }


    }
}
