using LeadershipCollective.Models;
using LeadershipCollective.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public class MediaMessageRepository : BaseRepository, IMediaMessageRepository
    {
        public MediaMessageRepository(IConfiguration configuration) : base(configuration) { }
        public List<MediaRecMessage> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT
                            m.Id AS MediaRecMessageId, m.Content , m.UserProfileId AS UserProfileId , m.MediaRecommendationId AS MediaRecommendationId, m.DateCreated AS MediaMessageCreated ,       
                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId, u.DisplayName,
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName,

                            mr.Id AS MediaRecommendationId
                          
                          FROM MediaRecMessage m
                          LEFT JOIN UserProfile u ON m.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id                          
                          LEFT JOIN MediaRecommendation mr ON m.MediaRecommendationId = mr.Id
                          ORDER BY m.DateCreated DESC
                           ";

                    var reader = cmd.ExecuteReader();

                    var messages = new List<MediaRecMessage>();
                    while (reader.Read())
                    {
                        messages.Add(new MediaRecMessage
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("MediaRecMessageId")),
                            Content = DbUtils.GetString(reader, "Content"),
                            DateCreated = DbUtils.GetDateTime(reader, "MediaMessageCreated"),
                            MediaRecommendationId = reader.GetInt32(reader.GetOrdinal("MediaRecommendationId")),
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
        public MediaRecMessage GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT
                            m.Id AS MediaRecMessageId, m.Content , m.UserProfileId AS UserProfileId , m.MediaRecommendationId AS MediaRecommendationId, m.DateCreated AS MediaMessageCreated ,       
                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId, u.DisplayName,
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName,

                            mr.Id AS MediaRecommendationId
                          
                          FROM MediaRecMessage m
                          LEFT JOIN UserProfile u ON m.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id                          
                          LEFT JOIN MediaRecommendation mr ON m.MediaRecommendationId = mr.Id
                          WHERE m.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    MediaRecMessage singleMessage = null;

                    while (reader.Read())
                    {
                        if (singleMessage == null)
                        {
                            singleMessage =new MediaRecMessage()
                            {
                                Id = id,
                                Content = DbUtils.GetString(reader, "Content"),
                                DateCreated = DbUtils.GetDateTime(reader, "MediaMessageCreated"),
                                MediaRecommendationId = reader.GetInt32(reader.GetOrdinal("MediaRecommendationId")),
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

        public void Add(MediaRecMessage mediaRecMessage)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO MediaRecMessage (
                            Content, DateCreated, MediaRecommendationId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Content, @DateCreated, @MediaRecommendationId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Content", DbUtils.ValueOrDBNull(mediaRecMessage.Content));
                    cmd.Parameters.AddWithValue("@DateCreated", DateTime.Now);
                    cmd.Parameters.AddWithValue("@MediaRecommendationId", mediaRecMessage.MediaRecommendationId);
                    cmd.Parameters.AddWithValue("@UserProfileId", mediaRecMessage.UserProfileId);

                    mediaRecMessage.Id = (int)cmd.ExecuteScalar();
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
                        DELETE FROM MediaRecMessage
                        WHERE Id = @id";

                    cmd2.Parameters.AddWithValue("@id", id);

                    cmd2.ExecuteNonQuery();
                }
            }
        }

        public void Update(MediaRecMessage mediaRecMessage)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE MediaRecMessage
                                    SET
                                        Content = @content
                                    WHERE Id = @id";


                    cmd.Parameters.AddWithValue("@content", DbUtils.ValueOrDBNull(mediaRecMessage.Content));
                    cmd.Parameters.AddWithValue("@id", mediaRecMessage.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
