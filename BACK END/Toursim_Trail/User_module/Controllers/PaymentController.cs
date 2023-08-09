using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using User_module.Interface;
using User_module.Models;

namespace User_module.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        public readonly IPayment service;
        public PaymentController(IPayment service)
        {
            this.service = service;
        }
        [HttpGet]       //to get all the payments
        public async Task<ActionResult<IEnumerable<Payment>>> GetAllPayments()
        {
            try
            {
                var payments = await service.GetAllPayments();
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving payments: {ex.Message}");
            }
        }

        [HttpGet("{id}")]               //to get a users
        public async Task<ActionResult<Payment>> GetPaymentbyId(int id)
        {
            try
            {
                var users = await service.GetPaymetsByUserId(id);
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
        [HttpPost]            //to post a new_payment

        public async Task<ActionResult<Payment>> Post_Payment(Payment payment)
        {
            var new_payment = await service.Add_Payment(payment);

            if (new_payment == null)
            {
                return Problem("Failed to create a  new payment.");
            }

            return Created("Get", new_payment);
        }
    }
}
