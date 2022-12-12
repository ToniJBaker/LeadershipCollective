using LeadershipCollective.Models;
using LeadershipCollective.Utils;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;

namespace LeadershipCollective.Repositories
{
    public class ConsultantRecommendationRepository: BaseRepository, IConsultantRecommendationRepository
    {
        public ConsultantRecommendationRepository(IConfiguration configuration) : base(configuration) { }

        public List<ConsultantRecommendation> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT
                            cr.id AS ConsultantRecId, cr.Name AS ConsultantName, cr.Content, cr.Email AS ConsultantEmail,              cr.PhoneNumber, cr.LinkAddress, cr.ServiceArea, cr.SubjectId,          cr.DateCreated, cr.ResourceTypeId, cr.UserProfileId, 

                            s.Id AS SubjectId, s.Name AS SubjectName, 

                            r.Id AS ResourceTypeId, r.Name AS ResourceTypeName,

                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId, u.DisplayName,
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName
                            
                          FROM ConsultantRecommendation cr
                          LEFT JOIN Subject s ON cr.SubjectId = s.Id
                          LEFT JOIN ResourceType r ON cr.ResourceTypeId = r.Id
                          LEFT JOIN UserProfile u ON cr.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                          
                          ORDER BY cr.DateCreated  
                           ";

                    var reader = cmd.ExecuteReader();

                    var recommendations = new List<ConsultantRecommendation>();
                    while (reader.Read())
                    {
                        recommendations.Add(new ConsultantRecommendation
                            {
                            Id = reader.GetInt32(reader.GetOrdinal("ConsultantRecId")),
                            Name = DbUtils.GetString(reader, "ConsultantName"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Email = DbUtils.GetString(reader, "ConsultantEmail"),
                            PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                            LinkAddress = DbUtils.GetString(reader, "LinkAddress"),
                            ServiceArea = DbUtils.GetString(reader, "ServiceArea"),
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

        public ConsultantRecommendation GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT
                            cr.id AS ConsultantRecId, cr.Name AS ConsultantName, cr.Content, cr.Email AS ConsultantEmail,              cr.PhoneNumber, cr.LinkAddress, cr.ServiceArea, cr.SubjectId,          cr.DateCreated, cr.ResourceTypeId, cr.UserProfileId, 

                            s.Id AS SubjectId, s.Name AS SubjectName, 

                            r.Id AS ResourceTypeId, r.Name AS ResourceTypeName,

                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId,  u.DisplayName,
                            
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName,
                            cm.Id AS ConsultantRecMessageId, cm.Content AS MessageContent , cm.UserProfileId AS MessageUserProfileId , cm.ConsultantRecommendationId AS ConsultantRecommendationId, cm.DateCreated AS ConsultantMessageCreated,
                            up.Id AS MessageUserProfileId, up.FirstName AS MessageFirstName, up.LastName AS MessageLastName, up.DisplayName AS MessageDisplayName

                          FROM ConsultantRecommendation cr
                          LEFT JOIN Subject s ON cr.SubjectId = s.Id
                          LEFT JOIN ResourceType r ON cr.ResourceTypeId = r.Id
                          LEFT JOIN UserProfile u ON cr.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                          LEFT JOIN ConsultantRecMessage cm ON cr.Id = cm.ConsultantRecommendationId
                          LEFT JOIN UserProfile up ON cm.UserProfileId = up.Id 
                          WHERE cr.Id = @Id
                          ORDER BY cm.DateCreated DESC ";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    ConsultantRecommendation singleRecommendation = null;

                    while (reader.Read())
                    {
                        if (singleRecommendation == null)
                        {
                            singleRecommendation =new ConsultantRecommendation()
                            {
                                Id = id,
                                Name = DbUtils.GetString(reader, "ConsultantName"),
                                Content = DbUtils.GetString(reader, "Content"),
                                Email = DbUtils.GetString(reader, "ConsultantEmail"),
                                PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                LinkAddress = DbUtils.GetString(reader, "LinkAddress"),
                                ServiceArea = DbUtils.GetString(reader, "ServiceArea"),
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
                                },
                                Messages = new List<ConsultantRecMessage>(),

                            };
                        }
                        if (DbUtils.IsNotDbNull(reader, "ConsultantRecMessageId"))
                        {
                            singleRecommendation.Messages.Add(new ConsultantRecMessage()
                            {
                                Id = DbUtils.GetInt(reader, "ConsultantRecMessageId"),
                                Content = DbUtils.GetString(reader, "MessageContent"),
                                ConsultantRecommendationId = id,
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("ConsultantMessageCreated")),
                                UserProfileId = DbUtils.GetInt(reader, "MessageUserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "MessageUserProfileId"),
                                    FirstName = DbUtils.GetString(reader, "MessageFirstName"),
                                    LastName = DbUtils.GetString(reader, "MessageLastName"),
                                    DisplayName = DbUtils.GetString(reader, "MessageDisplayName")
                                }
                            });
                        }
                    }

                    reader.Close();

                    return singleRecommendation;
                }
            }
        }

        public void Update(ConsultantRecommendation consultantRecommendation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE ConsultantRecommendation
                                    SET
                                          Name = @name,
                                          Content = @content,
                                          Email = @email,
                                          PhoneNumber = @phoneNumber,
                                          LinkAddress = @linkAddress,
                                          ServiceArea = @serviceArea,
                                          
                                          SubjectId = @subjectId,
                                          ResourceTypeId = @resourceTypeId
                                          
                                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", consultantRecommendation.Name);
                    cmd.Parameters.AddWithValue("@content", DbUtils.ValueOrDBNull(consultantRecommendation.Content));
                    cmd.Parameters.AddWithValue("@email", DbUtils.ValueOrDBNull(consultantRecommendation.Email));
                    cmd.Parameters.AddWithValue("@phoneNumber", DbUtils.ValueOrDBNull(consultantRecommendation.PhoneNumber));
                    cmd.Parameters.AddWithValue("@linkAddress", DbUtils.ValueOrDBNull(consultantRecommendation.LinkAddress));
                    cmd.Parameters.AddWithValue("@serviceArea", consultantRecommendation.ServiceArea);
                    cmd.Parameters.AddWithValue("@subjectId", consultantRecommendation.SubjectId);
                    cmd.Parameters.AddWithValue("@resourceTypeId", consultantRecommendation.ResourceTypeId);
                    cmd.Parameters.AddWithValue("@id", consultantRecommendation.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Add(ConsultantRecommendation consultantRecommendation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ConsultantRecommendation (
                            Name, Content, Email, PhoneNumber, ServiceArea, LinkAddress, DateCreated, SubjectId, ResourceTypeId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @Content, @Email,@PhoneNumber, @ServiceArea, @LinkAddress, @DateCreated, @SubjectId,
                            @ResourceTypeId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Name", consultantRecommendation.Name);
                    cmd.Parameters.AddWithValue("@Content", DbUtils.ValueOrDBNull(consultantRecommendation.Content));
                    cmd.Parameters.AddWithValue("@Email", DbUtils.ValueOrDBNull(consultantRecommendation.Email));
                    cmd.Parameters.AddWithValue("@PhoneNumber", DbUtils.ValueOrDBNull(consultantRecommendation.PhoneNumber));
                    cmd.Parameters.AddWithValue("@ServiceArea", consultantRecommendation.ServiceArea);
                    cmd.Parameters.AddWithValue("@LinkAddress", DbUtils.ValueOrDBNull(consultantRecommendation.LinkAddress));
                    cmd.Parameters.AddWithValue("@DateCreated", DateTime.Now);
                    cmd.Parameters.AddWithValue("@SubjectId", consultantRecommendation.SubjectId);
                    cmd.Parameters.AddWithValue("@ResourceTypeId", consultantRecommendation.ResourceTypeId);
                    cmd.Parameters.AddWithValue("@UserProfileId", consultantRecommendation.UserProfileId);

                    consultantRecommendation.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                // The first SQL command deletes the comments belonging to the post to be deleted
                //using (var cmd = conn.CreateCommand())
                //{
                //    cmd.CommandText = @"
                //        DELETE FROM Comment
                //        WHERE PostId = @id";

                //    cmd.Parameters.AddWithValue("@id", id);

                //    cmd.ExecuteNonQuery();
                //}

                // The second SQL command deletes the post itself
                using (var cmd2 = conn.CreateCommand())
                {
                    cmd2.CommandText = @"
                        DELETE FROM ConsultantRecommendation
                        WHERE Id = @id";

                    cmd2.Parameters.AddWithValue("@id", id);

                    cmd2.ExecuteNonQuery();
                }
            }
        }
        public List<ConsultantRecommendation> SearchBySubjectId(int id) //GET List of ConsultantRecommendations by Subject
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT
                            cr.id AS ConsultantRecId, cr.Name AS ConsultantName, cr.Content, cr.Email AS ConsultantEmail,              cr.PhoneNumber, cr.LinkAddress, cr.ServiceArea, cr.SubjectId,          cr.DateCreated, cr.ResourceTypeId, cr.UserProfileId, 

                            s.Id AS SubjectId, s.Name AS SubjectName, 

                            r.Id AS ResourceTypeId, r.Name AS ResourceTypeName,

                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail, u.UserTypeId,             u.DisplayName,
                            ut.Id AS UserTypeId, ut.Name AS UserTypeName
                          FROM ConsultantRecommendation cr
                          LEFT JOIN Subject s ON cr.SubjectId = s.Id
                          LEFT JOIN ResourceType r ON cr.ResourceTypeId = r.Id
                          LEFT JOIN UserProfile u ON cr.UserProfileId = u.Id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                          WHERE s.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    ConsultantRecommendation singleRecommendation = null;

                    var recommendations = new List<ConsultantRecommendation>();
                    while (reader.Read())
                    {
                        recommendations.Add(new ConsultantRecommendation()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("ConsultantRecId")),
                            Name = DbUtils.GetString(reader, "ConsultantName"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Email = DbUtils.GetString(reader, "ConsultantEmail"),
                            PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                            LinkAddress = DbUtils.GetString(reader, "LinkAddress"),
                            ServiceArea = DbUtils.GetString(reader, "ServiceArea"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            SubjectId = id,
                            ResourceTypeId = reader.GetInt32(reader.GetOrdinal("ResourceTypeId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Subject = new Subject()
                            {
                                Id = id,
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

    }
}
