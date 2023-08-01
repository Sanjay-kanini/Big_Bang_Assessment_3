using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tours.Context;
using Tours.Interface;
using Tours.Models;

namespace Tours.Service
{
    public class FeedbackService:IFeedback
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ToursContext context;
        public FeedbackService(ToursContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        //To display all the Feedbacks
        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            try
            {
                var feedback = await context.Feedbacks.Include(x => x.Add_Tour).ToListAsync();
                return feedback;

            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve Tours.", ex);
            }
        }

        //To Create a new Feedback 
        public async Task<Feedback> Add_Feedback([FromForm] Feedback feedback)
        {
            try
            {

                var p = context.Add_Tours.Find(feedback.Add_Tour.tour_id);
                feedback.Add_Tour = p; 

               
                context.Feedbacks.Add(feedback);
                await context.SaveChangesAsync();

                return feedback;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create the Feedback.", ex);
            }
        }


        //To get the Feedback by the Tour package id 

        public async Task<Feedback> Get_Feedbackby_id(int tour_id)
        {
            try
            {
                return await context.Feedbacks.Include(d => d.Add_Tour.tour_id).FirstOrDefaultAsync(d => d.Add_Tour.tour_id == tour_id);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the Feedback by ID.", ex);
            }
        }
    }
}

