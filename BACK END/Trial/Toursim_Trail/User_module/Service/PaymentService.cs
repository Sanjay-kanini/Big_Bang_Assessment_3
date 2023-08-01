using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using User_module.Context;
using User_module.Interface;
using User_module.Models;

namespace User_module.Service
{
    public class PaymentService:IPayment
    {

        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly UserContext context;
        public PaymentService(UserContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IEnumerable<Payment>> GetAllPayments()
        {
            try
            {
                var Payments = await context.Payments.ToListAsync();
                return Payments;

            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve Payments.", ex);
            }
        }




        public async Task<Payment> Add_Payment([FromForm] Payment payment)
        {
            try
            {
                var p = context.Users.Find(payment.user.user_id);
                payment.user = p;
               
                payment.status = "success";
                context.Payments.Add(payment);
                await context.SaveChangesAsync();

                return payment;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create the Feedback.", ex);
            }
        }

        //To get the payment based on the user_id 
        public async Task<List<Payment>> GetPaymetsByUserId(int user_id)
        {
            try
            {
                return await context.Payments
                    .Where(payment => payment.user.user_id == user_id)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the payment by User ID.", ex);
            }
        }

    }
}
