using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using Tours.Models;

namespace Tours.Interface
{
    public interface ITour_agency
    {
        Task<IEnumerable<Tour_agency>> GetAll_agency();
        Task<Tour_agency> Add_Tour_agency([FromForm] Tour_agency tour_Agency, IFormFile imageFile);  //to post a tour tour


        Task<Tour_agency> Get_TourAgencyby_id(int tour_owner_id);
        Task<Tour_agency> update_agency(int tour_owner_id, Tour_agency tour_Agency);

        Task<Tour_agency> Update_TourAgnecy_Status(int tour_owner_id);
        Task<Tour_agency> Update_TourAgency_Decline(int tour_owner_id);
        public Task<ICollection<Tour_agency>> Requested_TourAgency();
        public Task<ICollection<Tour_agency>> Accepted_TourAgency();

    }
}
