using Microsoft.AspNetCore.Mvc;
using Tours.Models;

namespace Tours.Interface
{
    public interface IImageGallery
    {
        Task<IEnumerable<ImageGallery>> GetAllImages();

        public Task<ImageGallery> PostImage([FromForm] ImageGallery img, IFormFile locationImage);
    }
}
