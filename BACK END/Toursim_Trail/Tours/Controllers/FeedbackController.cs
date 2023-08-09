using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tours.Interface;
using Tours.Models;

namespace Tours.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedback service;
        public FeedbackController(IFeedback service)
        {
            this.service = service;
        }
        [HttpGet]       //to get all the feedback
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedback()
        {
            try
            {
                var feedbacks = await service.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving feedbacks: {ex.Message}");
            }
        }

        [HttpGet("{id}")]               //to get a feedback
        public async Task<ActionResult<Feedback>> GetFeedbackById(int id)
        {
            try
            {
                var feedbacks = await service.Get_Feedbackby_id(id);
                if (feedbacks == null)
                {
                    return NotFound();
                }
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving feedbacks: {ex.Message}");
            }
        }
        [HttpPost]            //to post a feedback

        public async Task<ActionResult<Feedback>> PostFeedback(Feedback feedback)
        {
            var new_feedback = await service.Add_Feedback(feedback);

            if (new_feedback == null)
            {
                return Problem("Failed to create Feedback.");
            }

            return Created("Get", new_feedback);
        }

    }
}
