using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tours.Context;
using Tours.Interface;
using Tours.Models;

namespace Tours.Service
{
    public class ImageService:IImageGallery
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ToursContext context;
        public ImageService(ToursContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            _webHostEnvironment = webHostEnvironment;
        }


        public async Task<IEnumerable<ImageGallery>> GetAllImages()
        {
            return await context.ImageGallery.ToListAsync();
        }

        public async Task<ImageGallery> PostImage([FromForm] ImageGallery img, IFormFile locationImage)
        {
            {
                if (locationImage == null || locationImage.Length == 0)
                {
                    throw new ArgumentException("Invalid file");
                }

                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(locationImage.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await locationImage.CopyToAsync(stream);
                }

                img.Carousel = fileName;
                context.ImageGallery.Add(img);
                await context.SaveChangesAsync();

                return img;
            }
        }
    }
}
