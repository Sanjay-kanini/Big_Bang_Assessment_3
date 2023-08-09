//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Tours.Context;
//using Tours.Models;

//namespace Tours.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AdminsController : ControllerBase
//    {
//        private readonly ToursContext _context;

//        public AdminsController(ToursContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Admins
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
//        {
//          if (_context.Admins == null)
//          {
//              return NotFound();
//          }
//            return await _context.Admins.ToListAsync();
//        }

        
        

//        // POST: api/Admins
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPost]
//        public async Task<ActionResult<Admin>> PostAdmin(Admin admin)
//        {
//          if (_context.Admins == null)
//          {
//              return Problem("Entity set 'ToursContext.Admins'  is null.");
//          }
//            _context.Admins.Add(admin);
//            await _context.SaveChangesAsync();

//            return CreatedAtAction("GetAdmin", new { id = admin.admin_id }, admin);
//        }

       
//        private bool AdminExists(int id)
//        {
//            return (_context.Admins?.Any(e => e.admin_id == id)).GetValueOrDefault();
//        }
//    }
//}
