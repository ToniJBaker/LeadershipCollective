using LeadershipCollective.Models;
using LeadershipCollective.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public class MediaRecommendationRepository : BaseRepository, IMediaRecommendationRepository
    {
        public MediaRecommendationRepository(IConfiguration configuration) : base(configuration) { }
        public List<MediaRecommendation> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT
                            mr.id AS MediaRecId, mr.Title, mr.Content, mr.Author, mr.PublicationDate, mr.LinkAddress, mr.SubjectId, mr.DateCreated, mr.ResourceTypeId, mr.UserProfileId, 

                            s.Id AS SubjectId, s.Name AS SubjectName, 

                            r.Id AS ResourceTypeId, r.Name AS ResourceTypeName,

                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId, u.DisplayName,
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName
                            
                          FROM MediaRecommendation mr
                          LEFT JOIN Subject s ON mr.SubjectId = s.Id
                          LEFT JOIN ResourceType r ON mr.ResourceTypeId = r.Id
                          LEFT JOIN UserProfile u ON mr.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                          
                          ORDER BY mr.DateCreated  
                           ";

                    var reader = cmd.ExecuteReader();

                    var recommendations = new List<MediaRecommendation>();
                    while (reader.Read())
                    {
                        recommendations.Add(new MediaRecommendation
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("MediaRecId")),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Author = DbUtils.GetString(reader, "Author"),
                            PublicationDate = DbUtils.GetDateTime(reader, "PublicationDate"),
                            LinkAddress = DbUtils.GetString(reader, "LinkAddress"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            SubjectId = reader.GetInt32(reader.GetOrdinal("SubjectId")),
                            ResourceTypeId = reader.GetInt32(reader.GetOrdinal("ResourceTypeId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Subject = new Subject()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("SubjectId")),
                                Name = DbUtils.GetString(reader, "SubjectName"),
                            },
                            ResourceType = new ResourceType()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("ResourceTypeId")),
                                Name = DbUtils.GetString(reader, "ResourceTypeName"),
                            },
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

                    return recommendations;
                }
            }
        }

        public MediaRecommendation GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT
                            mr.id AS MediaRecId, mr.Title, mr.Content, mr.Author, mr.PublicationDate, mr.LinkAddress, mr.SubjectId, mr.DateCreated, mr.ResourceTypeId, mr.UserProfileId, 

                            s.Id AS SubjectId, s.Name AS SubjectName, 

                            r.Id AS ResourceTypeId, r.Name AS ResourceTypeName,

                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId, u.DisplayName,
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName
                            
                          FROM MediaRecommendation mr
                          LEFT JOIN Subject s ON mr.SubjectId = s.Id
                          LEFT JOIN ResourceType r ON mr.ResourceTypeId = r.Id
                          LEFT JOIN UserProfile u ON mr.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                          WHERE mr.Id = @Id
                          ORDER BY mr.DateCreated DESC ";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    MediaRecommendation singleRecommendation = null;

                    while (reader.Read())
                    {
                        if (singleRecommendation == null)
                        {
                            singleRecommendation =new MediaRecommendation()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("MediaRecId")),
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "Content"),
                                Author = DbUtils.GetString(reader, "Author"),
                                PublicationDate = DbUtils.GetDateTime(reader, "PublicationDate"),
                                LinkAddress = DbUtils.GetString(reader, "LinkAddress"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                SubjectId = reader.GetInt32(reader.GetOrdinal("SubjectId")),
                                ResourceTypeId = reader.GetInt32(reader.GetOrdinal("ResourceTypeId")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                Subject = new Subject()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("SubjectId")),
                                    Name = DbUtils.GetString(reader, "SubjectName"),
                                },
                                ResourceType = new ResourceType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("ResourceTypeId")),
                                    Name = DbUtils.GetString(reader, "ResourceTypeName"),
                                },
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

                    return singleRecommendation;
                }
            }
        }

        public void Update(MediaRecommendation mediaRecommendation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE MediaRecommendation
                                    SET
                                          Title = @title,
                                          Content = @content,
                                          Author = @author,
                                          PublicationDate = @publicationDate,
                                          LinkAddress = @linkAddress,
                                          SubjectId = @subjectId,
                                          ResourceTypeId = @resourceTypeId
                                          
                                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", mediaRecommendation.Title);
                    cmd.Parameters.AddWithValue("@content", DbUtils.ValueOrDBNull(mediaRecommendation.Content));
                    cmd.Parameters.AddWithValue("@author", DbUtils.ValueOrDBNull(mediaRecommendation.Author));
                    cmd.Parameters.AddWithValue("@publicationDate", DbUtils.ValueOrDBNull(mediaRecommendation.PublicationDate));
                    cmd.Parameters.AddWithValue("@linkAddress", DbUtils.ValueOrDBNull(mediaRecommendation.LinkAddress));
                    cmd.Parameters.AddWithValue("@subjectId", mediaRecommendation.SubjectId);
                    cmd.Parameters.AddWithValue("@resourceTypeId", mediaRecommendation.ResourceTypeId);
                    cmd.Parameters.AddWithValue("@id", mediaRecommendation.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Add(MediaRecommendation mediaRecommendation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO MediaRecommendation (
                            Title, Content, Author, PublicationDate, LinkAddress, DateCreated, SubjectId, ResourceTypeId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @Author, @PublicationDate, @LinkAddress, @DateCreated, @SubjectId,
                            @ResourceTypeId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", mediaRecommendation.Title);
                    cmd.Parameters.AddWithValue("@Content", DbUtils.ValueOrDBNull(mediaRecommendation.Content));
                    cmd.Parameters.AddWithValue("@Author", DbUtils.ValueOrDBNull(mediaRecommendation.Author));
                    cmd.Parameters.AddWithValue("@PublicationDate", DbUtils.ValueOrDBNull(mediaRecommendation.PublicationDate));
                    cmd.Parameters.AddWithValue("@LinkAddress", DbUtils.ValueOrDBNull(mediaRecommendation.LinkAddress));
                    cmd.Parameters.AddWithValue("@DateCreated", DateTime.Now);
                    cmd.Parameters.AddWithValue("@SubjectId", mediaRecommendation.SubjectId);
                    cmd.Parameters.AddWithValue("@ResourceTypeId", mediaRecommendation.ResourceTypeId);
                    cmd.Parameters.AddWithValue("@UserProfileId", mediaRecommendation.UserProfileId);

                    mediaRecommendation.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                ////The first SQL command deletes the comments belonging to the post to be deleted
                //using (var cmd = conn.CreateCommand())
                //{
                //    cmd.CommandText = @"
                //        DELETE FROM ConsultantRecMessage
                //        WHERE ConsultantRecommendationId = @id";

                //    cmd.Parameters.AddWithValue("@id", id);

                //    cmd.ExecuteNonQuery();
                //}

                //The second SQL command deletes the post itself
                using (var cmd2 = conn.CreateCommand())
                {
                    cmd2.CommandText = @"
                        DELETE FROM MediaRecommendation
                        WHERE Id = @id";

                    cmd2.Parameters.AddWithValue("@id", id);

                    cmd2.ExecuteNonQuery();
                }
            }
        }

    }
}
