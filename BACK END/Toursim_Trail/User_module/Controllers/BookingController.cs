using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using User_module.Interface;
using User_module.Models;

namespace User_module.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        public readonly IBooking service;
        public BookingController(IBooking service)
        {
            this.service = service;
        }
        [HttpGet]       //to get all the Bookings
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBooking()
        {
            try
            {
                var booking = await service.GetAllBookings();
                return Ok(booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving booking: {ex.Message}");
            }
        }

        [HttpGet("{id}")]               //to get a booking
        public async Task<ActionResult<Booking>> GetBookingbyId(int id)
        {
            try
            {
                var users = await service.GetBookingsByUserId(id);
                if (users == null)
                {
                    return NotFound();
                }
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving users: {ex.Message}");
            }
        }
        [HttpPost]            //to post a new_booking

        public async Task<ActionResult<Booking>> Post_Booking(Booking booking)
        {
            var new_booking = await service.Add_Booking(booking);

            if (new_booking == null)
            {
                return Problem("Failed to create a  new booking.");
            }

            return Created("Get", new_booking);
        }
    }
}

