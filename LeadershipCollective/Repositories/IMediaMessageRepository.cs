using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface IMediaMessageRepository
    {
        void Add(MediaRecMessage mediaRecMessage);
        void Delete(int id);
        List<MediaRecMessage> GetAll();
        MediaRecMessage GetById(int id);
        void Update(MediaRecMessage mediaRecMessage);
    }
}