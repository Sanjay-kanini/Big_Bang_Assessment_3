using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using User_module.Context;
using User_module.Interface;
using User_module.Models;

namespace User_module.Service
{
    public class PaymentService : IPayment
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
            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    // Add the payment and set its status as "Success"
                    payment.status = "success";
                    context.Payments.Add(payment);
                    await context.SaveChangesAsync();

                    // Find the corresponding booking and update its status
                    var booking = await context.Bookings.FindAsync(payment.booking_id_fk);
                    if (booking != null)
                    {
                        booking.status = "success";
                        await context.SaveChangesAsync();
                    }

                    transaction.Commit();
                    return payment;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw new Exception("Failed to create the Payment and update booking status.", ex);
                }
            }
        }


        //To get the payment based on the user_id 
        public async Task<List<Payment>> GetPaymetsByUserId(int id)
        {
            try
            {
                return await context.Payments
                    .Where(payment => payment.transaction_id == id)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the payment by User ID.", ex);
            }
        }

    }
}
