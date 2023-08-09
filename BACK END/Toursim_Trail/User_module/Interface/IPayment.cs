
using Microsoft.AspNetCore.Mvc;
using User_module.Models;

namespace User_module.Interface
{
    public interface IPayment
    {
        Task<IEnumerable<Payment>> GetAllPayments();  //to get all the payments

        Task<Payment> Add_Payment([FromForm] Payment payment);  //to add a new payments 

        Task<List<Payment>> GetPaymetsByUserId(int user_id);  // To get the payment of the specific user

    }
}
