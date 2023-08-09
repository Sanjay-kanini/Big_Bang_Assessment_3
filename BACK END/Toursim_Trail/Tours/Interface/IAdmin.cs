using Tours.Models;

namespace Tours.Interface
{
    public interface IAdmin
    {
        Task<Tour_agency> GetAgentByEmailAndPassword(string email, string password);

    }
}
