using Azure;
using LeadershipCollective.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public class SubjectRepository : BaseRepository, ISubjectRepository
    {
        public SubjectRepository(IConfiguration configuration) : base(configuration) { }
        //Get a list of all subjects
        public List<Subject> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM Subject ORDER BY Name";
                    var reader = cmd.ExecuteReader();
                    List<Subject> subjects = new List<Subject>();

                    while (reader.Read())
                    {
                        subjects.Add(new Subject()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }
                    reader.Close();
                    return subjects;
                }
            }
        }

    }
}
