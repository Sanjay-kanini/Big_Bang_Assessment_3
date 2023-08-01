using Microsoft.AspNetCore.Mvc;
using Tours.Models;

namespace Tours.Interface
{
    public interface IFeedback
    {
        Task<IEnumerable<Feedback>> GetAllFeedbacks();
        Task<Feedback> Add_Feedback([FromForm]  Feedback Feedback);
        Task<Feedback> Get_Feedbackby_id(int tour_id);
    }
}
