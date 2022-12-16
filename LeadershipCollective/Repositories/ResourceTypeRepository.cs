using LeadershipCollective.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public class ResourceTypeRepository : BaseRepository, IResourceTypeRepository
    {
        public ResourceTypeRepository(IConfiguration configuration) : base(configuration) { }


        //Get a list of all resourceTypes
        public List<ResourceType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM ResourceType ORDER BY Name";
                    var reader = cmd.ExecuteReader();

                    List<ResourceType> resourceTypes = new List<ResourceType>();

                    while (reader.Read())
                    {
                        resourceTypes.Add(new ResourceType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }
                    reader.Close();
                    return resourceTypes;
                }
            }
        }


    }
}
