using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tours.Interface;
using Tours.Models;

namespace Tours.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageGalleryController : ControllerBase
    {
        private readonly IImageGallery service;
        public ImageGalleryController(IImageGallery service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImageGallery>>> GetAllImage()
        {
            try
            {
                var images = await service.GetAllImages();
                return Ok(images);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving images: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ImageGallery>> Post([FromForm] ImageGallery img, IFormFile imageFile)
        {
            try
            {
                var createdCourse = await service.PostImage(img, imageFile);
                return CreatedAtAction("Get", new { id = createdCourse.image_id }, createdCourse);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }


    }
}
