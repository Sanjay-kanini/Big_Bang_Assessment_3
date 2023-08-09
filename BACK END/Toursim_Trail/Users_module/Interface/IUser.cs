using User_module.Models;

namespace User_module.Interface
{
    public interface IUser
    {
        Task<IEnumerable<User>> GetAllUser();  //to get all the users
        Task<User> GetUserById(int user_id);  // to get the user by id (for my profile page )
        Task<User> Post_User(User user);      //to add a new user (Signup page)
        Task<int> Update_User(int id, User User);    //to update the user
    }
}
