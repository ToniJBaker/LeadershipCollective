using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface ILeadershipEventRepository
    {
        List<LeadershipEvent> GetAll();
        LeadershipEvent GetById(int id);
        void Update(LeadershipEvent leadershipEvent);
        void Add(LeadershipEvent leadershipEvent);
        void Delete(int id);




    }
}