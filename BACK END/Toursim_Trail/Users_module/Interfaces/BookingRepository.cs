// BookingRepository.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using User_module.Context;
using User_module.Interface;
using User_module.Models;

namespace User_module.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly UserContext _context;

        public BookingRepository(UserContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            try
            {
                return await _context.Bookings.ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exception (log or rethrow)
                throw;
            }
        }

        public async Task<Booking> AddBooking(Booking booking)
        {
            try
            {
                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();
                return booking;
            }
            catch (Exception ex)
            {
                // Handle exception (log or rethrow)
                throw;
            }
        }

        public async Task<Booking> GetBookingById(int id)
        {
            try
            {
                return await _context.Bookings.FirstOrDefaultAsync(booking => booking.booking_id == id);
            }
            catch (Exception ex)
            {
                // Handle exception (log or rethrow)
                throw;
            }
        }

        public async Task<List<Booking>> GetBookingByUserId(int id)
        {
            try
            {
                return await _context.Bookings.Where(booking => booking.user_id_fk == id).ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exception (log or rethrow)
                throw;
            }
        }
    }
}
