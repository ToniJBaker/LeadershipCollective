using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface ILeadershipEventRepository
    {
        List<LeadershipEvent> GetAll();
    }
}