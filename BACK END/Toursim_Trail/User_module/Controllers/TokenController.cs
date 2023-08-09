using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using User_module.Context;
using User_module.Models;

namespace User_module.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserContext context;

        //private const string AdminRole = "Admin";
        private const string User = "user";

        public TokenController(IConfiguration configuration, UserContext context)
        {
            _configuration = configuration;
            this.context = context;
        }
        [HttpPost("user")]
        public async Task<IActionResult> Post_User(User user)
        {
            if (user != null && !string.IsNullOrEmpty(user.email_id) && !string.IsNullOrEmpty(user.password))
            {
                var check_users = await context.Users.FirstOrDefaultAsync(x =>
                    x.email_id == user.email_id && x.password == user.password);

                if (check_users != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("user_id", check_users.user_id.ToString()),
                        new Claim("email_id", check_users.email_id),
                        new Claim("password", check_users.password),
                        new Claim(ClaimTypes.Role, User)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:ValidIssuer"],
                        _configuration["Jwt:ValidAudience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: signIn);

                    var response = new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        user = check_users.user_id
                    };

                    return Ok(response);
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
