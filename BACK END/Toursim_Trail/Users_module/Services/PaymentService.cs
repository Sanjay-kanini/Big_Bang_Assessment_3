//// PaymentService.cs
//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Hosting;
//using User_module.Interface;
//using User_module.Models;

//namespace User_module.Service
//{
//    public class PaymentService : IPaymentService
//    {
//        private readonly IPaymentRepository _repository;
//        private readonly IWebHostEnvironment _webHostEnvironment;

//        public PaymentService(IPaymentRepository repository, IWebHostEnvironment webHostEnvironment)
//        {
//            _repository = repository;
//            _webHostEnvironment = webHostEnvironment;
//        }

//        public async Task<IEnumerable<Payment>> GetAllPayments()
//        {
//            try
//            {
//                return await _repository.GetAllPayments();
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("Failed to retrieve Payments.", ex);
//            }
//        }

//        public async Task<Payment> AddPayment(Payment payment)
//        {
//            try
//            {
//                payment.status = "success";
//                var newPayment = await _repository.AddPayment(payment);

//                var booking = await _repository.GetPaymentsByUserId(payment.booking_id_fk);
//                if (booking != null)
//                {
//                    booking.status = "success";
//                    await _repository.SaveChangesAsync();
//                }

//                return newPayment;
//            }
//            catch (Exception ex)
//            {
//                // Handle exception (log or rethrow)
//                throw;
//            }
//        }

//        public async Task<List<Payment>> GetPaymentsByUserId(int id)
//        {
//            try
//            {
//                return await _repository.GetPaymentsByUserId(id);
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("Failed to retrieve payments by User ID.", ex);
//            }
//        }
//    }
//}
