using Microsoft.EntityFrameworkCore;
using Tours.Context;
using Tours.Interface;
using Tours.Models;

namespace Tours.Service
{
    public class AdminService:IAdmin
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ToursContext context;
        public AdminService(ToursContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<Tour_agency> GetAgentByEmailAndPassword(string email, string password)
        {
            return await context.Tour_agency.FirstOrDefaultAsync(x =>
                x.email_id == email && x.password == password);
        }
    }
}
