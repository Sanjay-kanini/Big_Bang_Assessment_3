using Microsoft.AspNetCore.Mvc;
using User_module.Models;

namespace User_module.Interface
{
    public interface IBooking
    {
        Task<IEnumerable<Booking>> GetAllBookings();  //To get all the bookings
        Task<Booking> Add_Booking([FromForm] Booking booking);    //To  add a new booking 

        Task<List<Booking>> GetBookingsByUserId(int user_id);  // To get the booking of the specific user




    }
}
