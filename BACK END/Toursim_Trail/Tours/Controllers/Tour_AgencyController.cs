﻿using Microsoft.AspNetCore.Authorization;
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
    public class Tour_AgencyController : ControllerBase
    {
        private readonly ITour_agency service;
        public Tour_AgencyController(ITour_agency service)
        {
            this.service = service;
        }
        [HttpGet]                       //to get all the tour agencies
        public async Task<ActionResult<IEnumerable<Tour_agency>>>  all_tour_agencies()
        {
            try
            {
                var tour_agency = await service.GetAll_agency();
                return Ok(tour_agency);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving tour_agency: {ex.Message}");
            }
        }

        [HttpGet("{id}")]                 //to get a tour agency by id
        public async Task<ActionResult<Tour_agency>> tour_agencies_byid(int id)
        {
            try
            {
                var tour_agency = await service.Get_TourAgencyby_id(id);
                if (tour_agency == null)
                {
                    return NotFound();
                }
                return Ok(tour_agency);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving tour_agency: {ex.Message}");
            }
        }


        [HttpPost]                        //to post a tour agency

        public async Task<ActionResult> Post([FromForm] Tour_agency tour_Agency, IFormFile imageFile)
        {

            try
            {
                var created = await service.Add_Tour_agency(tour_Agency, imageFile);
                return Created("Get", created);


            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }


        [HttpPut("status/{tour_owner_id}")]             // to accept the status of the agency )
       // [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Tour_agency>>allow_agency(int tour_owner_id)
        {
            try
            {
                var update_agency = await service.Update_TourAgnecy_Status(tour_owner_id);

                if (update_agency == null)
                {
                    return NotFound();
                }

                return Ok(update_agency);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("status_decline/{tour_owner_id}")]               // to change the status of the agency (Decline)
        //[Authorize(Roles = "Admin")]

        public async Task<ActionResult<Tour_agency>> decline_agency(int tour_owner_id)
        {
            try
            {
                var update_agency = await service.Update_TourAgency_Decline(tour_owner_id);

                if (update_agency == null)
                {
                    return NotFound();
                }

                return Ok(update_agency);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("requested")]      // to view the requested tour agencies
        //[Authorize(Roles = "Admin")]

        public async Task<ActionResult<Tour_agency>>requested_agencies()
        {
            var result = await service.Requested_TourAgency();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("accepted")]      //To view the accepted tour agencies
        //[Authorize(Roles = "Admin,Patients")]
        public async Task<ActionResult<Tour_agency>> accepted_agencies()
        {
            var result = await service.Accepted_TourAgency();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }



    }
}
