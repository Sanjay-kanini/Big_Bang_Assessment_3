using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using Tours.Context;
using Tours.Interface;
using Tours.Models;

namespace Tours.Service
{
    public class Tour_AgencyService:ITour_agency
    {

        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ToursContext context;
        public Tour_AgencyService(ToursContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        //To display all the Tour_Agency
        public async Task<IEnumerable<Tour_agency>> GetAll_agency()
        {
            try
            {
                var tour = await context.Tour_agency.Include(x => x.Add_Tours).ToListAsync();
                return tour;

            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve Tours Agency.", ex);
            }
        }

        //To Create a new Tour Company 
        public async Task<Tour_agency> Add_Tour_agency([FromForm] Tour_agency tour_Agency, IFormFile imageFile)
        {
            try
            {
                // Handle image upload
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
                tour_Agency.company_logo = fileName;

                // Set default status
                tour_Agency.status = "Not Admitted";

                context.Tour_agency.Add(tour_Agency);
                await context.SaveChangesAsync();

                return tour_Agency;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create the Tour Agency.", ex);
            }
        }



        //To get the tour agency by id 

        public async Task<Tour_agency> Get_TourAgencyby_id(int tour_owner_id)
        {
            try
            {
                return await context.Tour_agency.FirstOrDefaultAsync(d => d.tour_owner_id== tour_owner_id);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the Agency by ID.", ex);
            }
        }


        //update the tour_Agency
        public async Task<Tour_agency> update_agency(int tour_owner_id, Tour_agency tour_Agency)
        {
            try
            {
                var exsiting_agency = await context.Tour_agency.FindAsync(tour_owner_id);
                if (exsiting_agency == null)
                {
                    return null;
                }

                exsiting_agency.email_id = tour_Agency.email_id;
                exsiting_agency.password = tour_Agency.password;
                exsiting_agency.tour_company_name = tour_Agency.tour_company_name;
                exsiting_agency.tour_company_address = tour_Agency.tour_company_address;
               
               

                await context.SaveChangesAsync();

                return exsiting_agency;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the Tour Agency.", ex);
            }
        }

        // To Update the status field of the Tour Agency -- Approving the Tour agency
        public async Task<Tour_agency> Update_TourAgnecy_Status(int tour_owner_id)
        {
            try
            {
                var existing_agency = await context.Tour_agency.FindAsync(tour_owner_id);
                if (existing_agency == null)
                {
                    return null;
                }

                existing_agency.status = "Admitted";

                await context.SaveChangesAsync();

                return existing_agency;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the Tour Agency status.", ex);
            }
        }

        //To delcine the Tour Agency
        public async Task<Tour_agency> Update_TourAgency_Decline(int tour_owner_id)
        {
            try
            {
                var existing_agency = await context.Tour_agency.FindAsync(tour_owner_id);
                if (existing_agency == null)
                {
                    return null;
                }

                existing_agency.status = "Not Admitted";

                await context.SaveChangesAsync();

                return existing_agency;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the Tout Agency.", ex);
            }
        }

        //To Find the Not Approved Tour Agencies

        public async Task<ICollection<Tour_agency>> Requested_TourAgency()
        {
            var agency = await context.Tour_agency.Where(s => s.status == "Not Admitted").ToListAsync();
            if (agency != null)
            {
                return agency;
            }
            return null;
        }


        //To Find the  Approved Tour Agencies--used to filter and view in the admin page 

        public async Task<ICollection<Tour_agency>> Accepted_TourAgency()
        {
            var agency = await context.Tour_agency.Where(s => s.status == "Admitted").ToListAsync();
            if (agency != null)
            {
                return agency;
            }
            return null;
        }

    }

}

