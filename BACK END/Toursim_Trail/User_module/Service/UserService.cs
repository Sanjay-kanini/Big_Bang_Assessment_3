using Microsoft.EntityFrameworkCore;
using User_module.Context;
using User_module.Interface;
using User_module.Models;

namespace User_module.Service
{
    public class UserService:IUser

    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly UserContext context;
        public UserService(UserContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IEnumerable<User>> GetAllUser()
        {
            try
            {
                return await context.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve Users.", ex);
            }
        }
        public async Task<User> GetUserById(int user_id)
        {
            try
            {
                return await context.Users.FirstOrDefaultAsync(p => p.user_id == user_id);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the User by ID.", ex);
            }
        }

        public async Task<User> Post_User(User User)
        {
            try
            {
                if (context.Users == null)
                {
                    throw new NullReferenceException("Entity set 'HospitalContext.patients' is null.");
                }

                context.Users.Add(User);
                await context.SaveChangesAsync();

                return User;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<int> Update_User(int id, User User)
        {
            try
            {

              context.Entry(User).State = EntityState.Modified;
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the patient.", ex);
            }
        }
    }
}
