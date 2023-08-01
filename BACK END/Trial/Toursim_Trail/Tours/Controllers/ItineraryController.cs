using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tours.Interface;
using Tours.Models;

namespace Tours.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryController : ControllerBase
    {
        private readonly IItinerary service;
        public ItineraryController(IItinerary service)
        {
            this.service = service;
        }


        [HttpGet]             //To get all the tours
     // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllItinerary()
        {
            try
            {
                var itinerary = await service.GetAllItinerary();
                return Ok(itinerary);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "An error occurred while retrieving the tours.");
            }
        }

        [HttpGet("{tour_id}")]
        public async Task<ActionResult<Add_Tour>> Get_Itinerary_id(int tour_id)
        {
            try
            {
                var itinerary = await service.GetItinerariesByTourId(tour_id);
                if (itinerary == null)
                {
                    return NotFound();
                }

                return Ok(itinerary);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving tours: {ex.Message}");
            }
        }


        [HttpPost]             //to post a new tour

        public async Task<ActionResult> Post([FromForm] Itinerary itinerary, IFormFile imageFile)
        {

            try
            {
                var created = await service.Add_Itinerary(itinerary, imageFile);
                return Created("Get", created);


            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }


        [HttpPut("{itinerary_id}")]                       //To update a tour
        //[Authorize(Roles = "Doctors,Admin")]
        public async Task<ActionResult<Add_Tour>> Put(int itinerary_id, [FromForm] Itinerary itinerary, IFormFile imageFile)
        {
            try
            {
                var update_itinerary = await service.Update_Itinerary(itinerary_id, itinerary, imageFile);
                if (update_itinerary == null)
                {
                    return NotFound();
                }

                return Ok(update_itinerary);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }
    }
}
