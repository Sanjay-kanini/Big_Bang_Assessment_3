
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.EntityFrameworkCore;
//using User_module.Context;
//using User_module.Interface;
//using User_module.Models;

//namespace User_module.Repository
//{
//    public class PaymentRepository : IPaymentRepository
//    {
//        private readonly UserContext _context;

//        public PaymentRepository(UserContext context)
//        {
//            _context = context;
//        }

//        public async Task<IEnumerable<Payment>> GetAllPayments()
//        {
//            return await _context.Payments.ToListAsync();
//        }

//        public async Task<Payment> AddPayment(Payment payment)
//        {
//            _context.Payments.Add(payment);
//            await _context.SaveChangesAsync();
//            return payment;
//        }

//        public async Task<List<Payment>> GetPaymentsByUserId(int id)
//        {
//            return await _context.Payments
//                .Where(payment => payment.transaction_id == id)
//                .ToListAsync();
//        }
//    }
//}
