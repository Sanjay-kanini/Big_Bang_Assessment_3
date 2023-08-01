using Microsoft.AspNetCore.Mvc;
using Tours.Models;

namespace Tours.Interface
{
    public interface IItinerary
    {
        Task<IEnumerable<Itinerary>> GetAllItinerary();
        Task<Itinerary> Add_Itinerary([FromForm] Itinerary itinerary, IFormFile imageFile);

        Task<Itinerary> Update_Itinerary(int itinerary_id, Itinerary itinerary, IFormFile imageFile);

        Task<List<Itinerary>> GetItinerariesByTourId(int tour_id);









    }
}
