using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Tours.Context;
using Tours.Models;

namespace Tours.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ToursContext _context;

        private const string AdminRole = "Admin";
        private const string AgentRole = "Agent";

        public TokenController(IConfiguration configuration, ToursContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Admin")]
        public async Task<IActionResult> PostAdmin(Admin adminData)
        {
            if (adminData != null && !string.IsNullOrEmpty(adminData.email_id) && !string.IsNullOrEmpty(adminData.password))
            {
                if (adminData.email_id == "admin@gmail.com" && adminData.password == "admin@123")
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("admin_id", "1"),
                        new Claim("email_id", adminData.email_id),
                        new Claim("password", adminData.password),
                        new Claim(ClaimTypes.Role, AdminRole)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:ValidIssuer"],
                        _configuration["Jwt:ValidAudience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
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

        [HttpPost("Agents")]
        public async Task<IActionResult> PostAgent(Tour_agency _userData)
        {
            if (_userData != null && !string.IsNullOrEmpty(_userData.email_id) && !string.IsNullOrEmpty(_userData.password))
            {
                var agent = await _context.Tour_agency.FirstOrDefaultAsync(x =>
                    x.email_id == _userData.email_id && x.password == _userData.password);

                if (agent != null)
                {
                    var claims = new[]
                    {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("tour_owner_id", agent.tour_owner_id.ToString()),
                new Claim("email_id", agent.email_id),
                new Claim("password", agent.password),
                new Claim("tour_company_name", agent.tour_company_name),
                new Claim(ClaimTypes.Role, AgentRole)
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
                        tour = agent.tour_owner_id,
                        username = agent.tour_company_name // Removed the semicolon here
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

