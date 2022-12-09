using Azure;
using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface ISubjectRepository
    {
        List<Subject> GetAll();
        Subject GetSubjectById(int id);

    }
}