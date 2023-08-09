using System.Collections.Generic;
using System.Threading.Tasks;
using User_module.Models;

namespace User_module.Interface
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllBookings();
        Task<Booking> AddBooking(Booking booking);
        Task<Booking> GetBookingById(int id);
        Task<List<Booking>> GetBookingByUserId(int id);
    }
}