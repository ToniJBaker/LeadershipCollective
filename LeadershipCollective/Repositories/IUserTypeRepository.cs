using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface IUserTypeRepository
    {
        List<UserType> GetAll();
    }
}