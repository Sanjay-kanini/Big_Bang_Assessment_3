// BookingService.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using User_module.Interface;
using User_module.Models;

namespace User_module.Service
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _repository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BookingService(IBookingRepository repository, IWebHostEnvironment webHostEnvironment)
        {
            _repository = repository;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            try
            {
                return await _repository.GetAllBookings();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve bookings.", ex);
            }
        }

        public async Task<Booking> AddBooking(Booking booking)
        {
            try
            {
                booking.status = "Payment Pending";
                return await _repository.AddBooking(booking);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create a new booking.", ex);
            }
        }

        public async Task<Booking> GetBookingById(int id)
        {
            try
            {
                return await _repository.GetBookingById(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the booking by ID.", ex);
            }
        }

        public async Task<List<Booking>> GetBookingByUserId(int id)
        {
            try
            {
                return await _repository.GetBookingByUserId(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the booking by user ID.", ex);
            }
        }
    }
}
