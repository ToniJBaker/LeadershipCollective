using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface IConsultantRecommendationRepository
    {
        List<ConsultantRecommendation> GetAll();
        ConsultantRecommendation GetById(int id);
    }
}
