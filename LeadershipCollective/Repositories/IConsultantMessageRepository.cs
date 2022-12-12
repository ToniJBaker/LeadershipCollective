using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface IConsultantMessageRepository
    {
        List<ConsultantRecMessage> GetAll();
    }
}