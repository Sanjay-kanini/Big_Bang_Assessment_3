using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using User_module.Context;
using User_module.Interface;
using User_module.Models;

namespace User_module.Service
{
    public class BookingService:IBooking
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly UserContext context;
        public BookingService(UserContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            try
            {
                var bookings = await context.Bookings.ToListAsync();
                return bookings;

            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve Booking.", ex);
            }
        }




        public async Task<Booking> Add_Booking([FromForm] Booking booking)
        {
            try
            {
                var p = context.Users.Find(booking.user.user_id);
                booking.user = p;

                // Assuming you have a separate Payments table with a foreign key to Booking
              
                context.Bookings.Add(booking);
                await context.SaveChangesAsync();

                return booking;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create the Feedback.", ex);
            }
        }


        //To get the booking based on the user_id 
        public async Task<List<Booking>> GetBookingsByUserId(int user_id)
        {
            try
            {
                return await context.Bookings
                    .Where(booking => booking.user.user_id == user_id)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the bookings by User ID.", ex);
            }
        }

    }
}
