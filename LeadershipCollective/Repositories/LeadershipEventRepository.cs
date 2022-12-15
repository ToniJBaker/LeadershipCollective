using LeadershipCollective.Models;
using LeadershipCollective.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public class LeadershipEventRepository : BaseRepository, ILeadershipEventRepository
    {
        public LeadershipEventRepository(IConfiguration configuration) : base(configuration) { }

        public List<LeadershipEvent> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT
                            e.Id AS LeadershipEventId, e.Title, e.Date, e.Location, e.LinkAddress, e.ImageLocation, e.Content, e.UserProfileId,

                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId, u.DisplayName,
                            
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName
                            
                          FROM LeadershipEvent e
                          LEFT JOIN UserProfile u ON e.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                          
                          ORDER BY e.Date";

                    var reader = cmd.ExecuteReader();

                    var events = new List<LeadershipEvent>();
                    while (reader.Read())
                    {
                        events.Add(new LeadershipEvent
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("LeadershipEventId")),
                            Title = DbUtils.GetString(reader, "Title"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            Location = DbUtils.GetString(reader, "Location"),
                            LinkAddress = DbUtils.GetString(reader, "LinkAddress"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            Content = DbUtils.GetString(reader, "Content"),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "UserEmail"),
                                UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                UserType = new UserType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    Name = DbUtils.GetString(reader, "UserTypeName"),
                                },


                            }
                        });
                    }
                    reader.Close();

                    return events;
                }
            }
        }
    }
}
