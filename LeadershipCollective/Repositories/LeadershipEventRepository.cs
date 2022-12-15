using LeadershipCollective.Models;
using LeadershipCollective.Utils;
using Microsoft.Extensions.Configuration;
using System;
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

        public LeadershipEvent GetById(int id)
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
                          WHERE e.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    LeadershipEvent singleEvent = null;

                    while (reader.Read())
                    {
                        if (singleEvent == null)
                        {
                            singleEvent =new LeadershipEvent()
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
                            };
                        }

                    }

                    reader.Close();

                    return singleEvent;
                }
            }
        }
        public void Update(LeadershipEvent leadershipEvent)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE LeadershipEvent
                                    SET
                                          Title = @title,
                                          Content = @content,
                                          Date = @date,
                                          Location = @location,
                                          LinkAddress = @linkAddress,
                                          ImageLocation = @imageLocation
                                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", DbUtils.ValueOrDBNull(leadershipEvent.Title));
                    cmd.Parameters.AddWithValue("@content",leadershipEvent.Content);
                    cmd.Parameters.AddWithValue("@date", leadershipEvent.Date);
                    cmd.Parameters.AddWithValue("@location",leadershipEvent.Location);
                    cmd.Parameters.AddWithValue("@linkAddress", DbUtils.ValueOrDBNull(leadershipEvent.LinkAddress));
                    cmd.Parameters.AddWithValue("@imageLocation", DbUtils.ValueOrDBNull(leadershipEvent.ImageLocation));
                   
                    cmd.Parameters.AddWithValue("@id", leadershipEvent.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Add(LeadershipEvent leadershipEvent)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO LeadershipEvent (
                            Title, Content, Date, Location, ImageLocation, LinkAddress, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @Date,@Location, @ImageLocation, @LinkAddress, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", DbUtils.ValueOrDBNull(leadershipEvent.Title));
                    cmd.Parameters.AddWithValue("@Content", leadershipEvent.Content);
                    cmd.Parameters.AddWithValue("@Date",leadershipEvent.Date);
                    cmd.Parameters.AddWithValue("@Location",leadershipEvent.Location);
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(leadershipEvent.ImageLocation));
                    cmd.Parameters.AddWithValue("@LinkAddress", DbUtils.ValueOrDBNull(leadershipEvent.LinkAddress));
                    cmd.Parameters.AddWithValue("@UserProfileId", leadershipEvent.UserProfileId);

                    leadershipEvent.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd2 = conn.CreateCommand())
                {
                    cmd2.CommandText = @"
                        DELETE FROM LeadershipEvent
                        WHERE Id = @id";

                    cmd2.Parameters.AddWithValue("@id", id);

                    cmd2.ExecuteNonQuery();
                }
            }
        }

    }
}
