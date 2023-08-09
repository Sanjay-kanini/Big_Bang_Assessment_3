//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using User_module.Context;
//using User_module.Interface;
//using User_module.Models;

//namespace User_module.Service
//{
//    public class BookingService : IBooking
//    {
//        private readonly IWebHostEnvironment _webHostEnvironment;

//        private readonly UserContext context;
       
//        public BookingService(UserContext context, IWebHostEnvironment webHostEnvironment)
//        {
//            this.context = context;
//            _webHostEnvironment = webHostEnvironment;
//        }

       

//        public async Task<IEnumerable<Booking>> GetAllBookings()
//        {
//            try
//            {
//                var bookings = await context.Bookings.ToListAsync();
//                return bookings;

//            }
//            catch (Exception ex)
//            {
//                throw new Exception("Failed to retrieve Booking.", ex);
//            }
//        }




//        public async Task<Booking> Add_Booking([FromForm] Booking booking)
//        {
//            try
//            {

//                booking.status = "Payment Pending";
//                // Assuming you have a separate Payments table with a foreign key to Booking

//                context.Bookings.Add(booking);
//                await context.SaveChangesAsync();

//                return booking;
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("Failed to create the Feedback.", ex);
//            }
//        }


//        //To get the booking based on the booking_id 
//        public async Task<Booking> GetBookingById(int id)
//        {
//            try
//            {
//                return await context.Bookings
//                    .FirstOrDefaultAsync(booking => booking.booking_id == id);
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("Failed to retrieve the booking by ID.", ex);
//            }
//        }
//        public async Task<List<Booking>> GetBookingByUserId(int id)
//        {
//            try
//            {
//                return await context.Bookings
//                    .Where(booking => booking.user_id_fk == id).ToListAsync();
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("Failed to retrieve the booking by ID.", ex);
//            }
//        }
        
//    }
//}
