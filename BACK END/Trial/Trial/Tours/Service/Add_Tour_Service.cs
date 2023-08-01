using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using Tours.Context;
using Tours.Interface;
using Tours.Models;

namespace Tours.Service
{
    public class Add_Tour_Service:IAdd_Tours
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ToursContext context;
        public Add_Tour_Service(ToursContext context, IWebHostEnvironment webHostEnvironment)
        {
           this.context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        //To display all the Tours
        public async Task<IEnumerable<Add_Tour>> GetAllTours()
        {
            try
            {
                var Tours = await context.Add_Tours.Include(x => x.feedbacks).ToListAsync();
                return Tours;

            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve Tours.", ex);
            }
        }

        //To Create a new Tour 
        public async Task<Add_Tour> Add_Tour([FromForm] Add_Tour Add_Tour, IFormFile imageFile)
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
                Add_Tour.hotel_image = fileName;

                // Ensure that the Tour_agency_id corresponds to an existing Tour_agency record
                var p = context.Tour_agency.Find(Add_Tour.tour_Agency.tour_owner_id);
                Add_Tour.tour_Agency = p;
                context.Add_Tours.Add(Add_Tour);
                await context.SaveChangesAsync();

                return Add_Tour;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create the tour.", ex);
            }
        }



        //TO update a Tour 
        public async Task<Add_Tour> Update_Tours(int tour_id, Add_Tour add_Tour, IFormFile imageFile)
        {
            try
            {
                var exisiting_tour = await context.Add_Tours.FindAsync(tour_id);
                if (exisiting_tour == null)
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
                    var oldFilePath = Path.Combine(uploadsFolder, exisiting_tour.hotel_image);
                    if (File.Exists(oldFilePath))
                    {
                        File.Delete(oldFilePath);
                    }

                    exisiting_tour.hotel_image = fileName;
                }

                exisiting_tour.tour_name = add_Tour.tour_name;
                exisiting_tour.country = add_Tour.country;
                exisiting_tour.tour_duration_days = add_Tour.tour_duration_days;
                exisiting_tour.tour_duration_nights = add_Tour.tour_duration_nights;
                exisiting_tour.tour_type = add_Tour.tour_type;
                exisiting_tour.tour_price = add_Tour.tour_price;
                exisiting_tour.nearby_hotels = add_Tour.nearby_hotels;
                exisiting_tour.costfor_two = add_Tour.costfor_two;
                exisiting_tour.hotel_cusine = add_Tour.hotel_cusine;

                var p = context.Tour_agency.Find(add_Tour.tour_Agency.tour_owner_id);
                add_Tour.tour_Agency = p;
                await context.SaveChangesAsync();

                return exisiting_tour;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the Tour.", ex);
            }
        }

        //To get the tour by id 

        public async Task<Add_Tour> Get_tourbyid(int tour_id)
        {
            try
            {
                return await context.Add_Tours.FirstOrDefaultAsync(d => d.tour_id == tour_id);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the Tour by ID.", ex);
            }
        }
    }
}
