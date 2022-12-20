using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface IMediaRecommendationRepository
    {
        List<MediaRecommendation> GetAll();
        MediaRecommendation GetById(int id);
        void Add(MediaRecommendation mediRecommendation);

        void Update(MediaRecommendation mediRecommendation);
        void Delete(int id);
        List<MediaRecommendation> SearchMediaBySubjectId(int id);



    }
}