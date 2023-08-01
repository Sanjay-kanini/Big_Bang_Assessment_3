using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using Tours.Context;
using Tours.Interface;
using Tours.Models;

namespace Tours.Service
{
    public class ItineraryService:IItinerary
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly ToursContext context;
        public ItineraryService(ToursContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        //To display all the Itineraries
        public async Task<IEnumerable<Itinerary>> GetAllItinerary()
        {
            try
            {
                var itinerary = await context.Itineraries.Include(x => x.Add_Tour).ToListAsync();
                return itinerary ;

            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve Tours.", ex);
            }
        }


        //To Create a new Itinerary 
        public async Task<Itinerary> Add_Itinerary([FromForm]  Itinerary itinerary, IFormFile imageFile)
        {
            try
            {
                if (imageFile == null || imageFile.Length == 0)
                {
                    throw new ArgumentException("Invalid file");
                }

                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                itinerary.location_image = fileName;


                
                var p = context.Add_Tours.Find(itinerary.Add_Tour.tour_id);
                itinerary.Add_Tour = p; 


                context.Itineraries.Add(itinerary);
                await context.SaveChangesAsync();

                return itinerary;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create the Itinerary.", ex);
            }
        }

        //To edit the itinerary 
        public async Task<Itinerary> Update_Itinerary(int itinerary_id, Itinerary itinerary, IFormFile imageFile)
        {
            try
            {
                var exisiting_itinerary = await context.Itineraries.FindAsync(itinerary_id);
                if (exisiting_itinerary == null)
                {
                    return null;
                }

                if (imageFile != null && imageFile.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(stream);
                    }

                    // Delete the old image file
                    var oldFilePath = Path.Combine(uploadsFolder, exisiting_itinerary.location_image);
                    if (File.Exists(oldFilePath))
                    {
                        File.Delete(oldFilePath);
                    }

                    exisiting_itinerary.location_image = fileName;
                }

                exisiting_itinerary.day = itinerary.day;
                exisiting_itinerary.location = itinerary.location;
                exisiting_itinerary.description = itinerary.description;

                var p = context.Add_Tours.Find(itinerary.Add_Tour.tour_id);
                itinerary.Add_Tour = p; 

                await context.SaveChangesAsync();

                return exisiting_itinerary;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the Itinerary.", ex);
            }
        }

        //TO get the Itinerary based on the tour, takes the tour_id and displays the corresponding itinerary
        public async Task<List<Itinerary>> GetItinerariesByTourId(int tour_id)
        {
            try
            {
                return await context.Itineraries
                    .Where(d => d.Add_Tour.tour_id == tour_id)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the Itineraries by Tour ID.", ex);
            }
        }
    }
}
