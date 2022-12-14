using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface IConsultantMessageRepository
    {
        List<ConsultantRecMessage> GetAll();
        ConsultantRecMessage GetById(int id);
        void Add(ConsultantRecMessage consultantRecMessage);
        void Update(ConsultantRecMessage consultantRecMessage);

        void Delete(int id); 
    }
}