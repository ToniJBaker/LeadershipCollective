using Azure;
using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface IConsultantRecommendationRepository
    {
        List<ConsultantRecommendation> GetAll();
        ConsultantRecommendation GetById(int id);
        void Add(ConsultantRecommendation consultantRecommendation);

        void Update(ConsultantRecommendation consultantRecommendation);
    }
}
