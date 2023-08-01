using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Numerics;
using Tours.Interface;
using Tours.Models;

namespace Tours.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Add_TourController : ControllerBase
    {
        private readonly IAdd_Tours service;
        public Add_TourController(IAdd_Tours service)
        {
            this.service = service;
        }


        [HttpGet]             //To get all the tours
       // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllTours()
        {
            try
            {
                var tours = await service.GetAllTours();
                return Ok(tours);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "An error occurred while retrieving the tours.");
            }
        }

        [HttpGet("{tour_id}")]
        public async Task<ActionResult<Add_Tour>> Get_Tourby_id(int tour_id)
        {
            try
            {
                var tour = await service.Get_tourbyid(tour_id);
                if (tour == null)
                {
                    return NotFound();
                }

                return Ok(tour);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving tours: {ex.Message}");
            }
        }


        [HttpPost]             //to post a new tour

        public async Task<ActionResult> Post([FromForm] Add_Tour add_Tour, IFormFile imageFile)
        {

            try
            {
                var created = await service.Add_Tour(add_Tour, imageFile);
                return Created("Get", created);


            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

         
        [HttpPut("{tour_id}")]                       //To update a tour
        //[Authorize(Roles = "Doctors,Admin")]
        public async Task<ActionResult<Add_Tour>> Put(int tour_id, [FromForm] Add_Tour add_Tour, IFormFile imageFile)
        {
            try
            {
                var update_tour = await service.Update_Tours(tour_id, add_Tour, imageFile);
                if (update_tour == null)
                {
                    return NotFound();
                }

                return Ok(update_tour);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }
    }
}
