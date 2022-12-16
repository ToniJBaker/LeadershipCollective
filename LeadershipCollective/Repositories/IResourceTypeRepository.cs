using LeadershipCollective.Models;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public interface IResourceTypeRepository
    {
        List<ResourceType> GetAll();
    }
}