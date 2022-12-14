using LeadershipCollective.Models;
using LeadershipCollective.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public class ConsultantMessageRepository : BaseRepository, IConsultantMessageRepository
    {
        public ConsultantMessageRepository(IConfiguration configuration) : base(configuration) { }

        public List<ConsultantRecMessage> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT
                            cm.Id AS ConsultantRecMessageId, cm.Content , cm.UserProfileId AS UserProfileId , cm.ConsultantRecommendationId AS ConsultantRecommendationId, cm.DateCreated AS ConsultantMessageCreated ,       
                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId, u.DisplayName,
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName,

                            cr.Id AS ConsultantRecommendationId
                          
                          FROM ConsultantRecMessage cm
                          LEFT JOIN UserProfile u ON cm.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id                          
                          LEFT JOIN ConsultantRecommendation cr ON cm.ConsultantRecommendationId = cr.Id
                          ORDER BY cm.DateCreated DESC
                           ";

                    var reader = cmd.ExecuteReader();

                    var messages = new List<ConsultantRecMessage>();
                    while (reader.Read())
                    {
                        messages.Add(new ConsultantRecMessage
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("ConsultantRecMessageId")),
                            Content = DbUtils.GetString(reader, "Content"),
                            DateCreated = DbUtils.GetDateTime(reader, "ConsultantMessageCreated"),
                            ConsultantRecommendationId = reader.GetInt32(reader.GetOrdinal("ConsultantRecommendationId")),
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
                            },


                        });
                    }
                    reader.Close();

                    return messages;
                }
            }
        }

        public ConsultantRecMessage GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT
                            cm.Id AS ConsultantRecMessageId, cm.Content , cm.UserProfileId AS UserProfileId , cm.ConsultantRecommendationId AS ConsultantRecommendationId, cm.DateCreated AS ConsultantMessageCreated ,       
                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId, u.DisplayName,
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName,

                            cr.Id AS ConsultantRecommendationId
                          
                          FROM ConsultantRecMessage cm
                          LEFT JOIN UserProfile u ON cm.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id                          
                          LEFT JOIN ConsultantRecommendation cr ON cm.ConsultantRecommendationId = cr.Id
                          WHERE cm.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    ConsultantRecMessage singleMessage = null;

                    while (reader.Read())
                    {
                        if (singleMessage == null)
                        {
                            singleMessage =new ConsultantRecMessage()
                            {
                                Id = id,
                                Content = DbUtils.GetString(reader, "Content"),
                                DateCreated = DbUtils.GetDateTime(reader, "ConsultantMessageCreated"),
                                ConsultantRecommendationId = reader.GetInt32(reader.GetOrdinal("ConsultantRecommendationId")),
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
                                    }
                                }
                            };
                        }
                        
                    }

                    reader.Close();

                    return singleMessage;
                }
            }
        }

        public void Add(ConsultantRecMessage consultantRecMessage)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ConsultantRecMessage (
                            Content, DateCreated, ConsultantRecommendationId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Content, @DateCreated, @ConsultantRecommendationId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Content", DbUtils.ValueOrDBNull(consultantRecMessage.Content));
                    cmd.Parameters.AddWithValue("@DateCreated", DateTime.Now);
                    cmd.Parameters.AddWithValue("@ConsultantRecommendationId", consultantRecMessage.ConsultantRecommendationId);
                    cmd.Parameters.AddWithValue("@UserProfileId", consultantRecMessage.UserProfileId);

                    consultantRecMessage.Id = (int)cmd.ExecuteScalar();
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
                        DELETE FROM ConsultantRecMessage
                        WHERE Id = @id";

                    cmd2.Parameters.AddWithValue("@id", id);

                    cmd2.ExecuteNonQuery();
                }
            }
        }

        public void Update(ConsultantRecMessage consultantRecMessage)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE ConsultantRecMessage
                                    SET
                                        Content = @content,
                                    WHERE Id = @id";

                    
                    cmd.Parameters.AddWithValue("@content", DbUtils.ValueOrDBNull(consultantRecMessage.Content));
                    cmd.Parameters.AddWithValue("@id", consultantRecMessage.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
