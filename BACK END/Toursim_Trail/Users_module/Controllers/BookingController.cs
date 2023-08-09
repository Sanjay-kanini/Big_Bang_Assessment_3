// BookingController.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using User_module.Interface;
using User_module.Models;

namespace User_module.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBooking()
        {
            try
            {
                var bookings = await _bookingService.GetAllBookings();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving bookings: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBookingbyId(int id)
        {
            try
            {
                var booking = await _bookingService.GetBookingById(id);
                if (booking == null)
                {
                    return NotFound();
                }
                return Ok(booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving booking: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            try
            {
                var newBooking = await _bookingService.AddBooking(booking);
                return CreatedAtAction(nameof(GetBookingbyId), new { id = newBooking.booking_id }, newBooking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating booking: {ex.Message}");
            }
        }

        [HttpGet("users/{id}")]
        public async Task<ActionResult<List<Booking>>> GetBookingByUserId(int id)
        {
            try
            {
                var bookings = await _bookingService.GetBookingByUserId(id);
                if (bookings == null)
                {
                    return NotFound();
                }
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving bookings: {ex.Message}");
            }
        }
    }
}
