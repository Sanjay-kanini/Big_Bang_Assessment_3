using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using Tours.Models;

namespace Tours.Interface
{
    public interface IAdd_Tours
    {
        Task<IEnumerable<Add_Tour>> GetAllTours();        //to get all the tours
        Task<Add_Tour> Add_Tour([FromForm] Add_Tour Add_Tour, IFormFile imageFile);  //to post a tour package

        Task<Add_Tour> Update_Tours(int tour_id, Add_Tour add_Tour, IFormFile imageFile);    //to update the tour package
        Task<Add_Tour> Get_tourbyid(int tour_id);   // to get the tour by id


    }

}
