using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using User_module.Interface;
using User_module.Models;

namespace User_module.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUser service;
        public UserController(IUser service)
        {
            this.service = service;
        }
        [HttpGet]       //to get all the Users
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            try
            {
                var users = await service.GetAllUser();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving users: {ex.Message}");
            }
        }

        [HttpGet("{id}")]               //to get a users
        public async Task<ActionResult<User>> GetUserbyId(int id)
        {
            try
            {
                var users = await service.GetUserById(id);
                if (users == null)
                {
                    return NotFound();
                }
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving users: {ex.Message}");
            }
        }
        [HttpPost]            //to post a users

        public async Task<ActionResult<User>> PostFeedback(User user)
        {
            var users = await service.Post_User(user);

            if (users == null)
            {
                return Problem("Failed to create users.");
            }

            return Created("Get", users);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Patients")]
        public async Task<ActionResult<int>> UpdateUser(int id, User user)
        {
            try
            {
                if (id != user.user_id)
                {
                    return BadRequest("Invalid user ID.");
                }

                var result = await service.Update_User(id, user);
                if (result == 0)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating User : {ex.Message}");
            }
        }

    }
}
