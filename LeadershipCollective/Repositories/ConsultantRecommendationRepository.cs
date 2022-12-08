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

                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail,              u.DisplayName
                          FROM ConsultantRecommendation cr
                          LEFT JOIN Subject s ON cr.SubjectId = s.Id
                          LEFT JOIN ResourceType r ON cr.ResourceTypeId = r.Id
                          LEFT JOIN UserProfile u ON cr.UserProfileId = u.Id
                          ORDER BY cr.DateCreated DESC  
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

                            u.Id AS UserProfileId, u.FirstName, u.LastName, u.Email AS UserEmail,              u.DisplayName
                          FROM ConsultantRecommendation cr
                          LEFT JOIN Subject s ON cr.SubjectId = s.Id
                          LEFT JOIN ResourceType r ON cr.ResourceTypeId = r.Id
                          LEFT JOIN UserProfile u ON cr.UserProfileId = u.Id
                          WHERE cr.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    ConsultantRecommendation singleRecommendation = null;

                    while (reader.Read())
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
                            }
                        };
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
                            Name, Content, Email, PhoneNumber, ServiceArea, LinkAddress, CreateDateTime, SubjectId, ResourceTypeId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @Content, @Email,@PhoneNumber, @ServiceArea, @LinkAddress, @CreateDateTime, @SubjectId,
                            @ResourceTypeId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Name", consultantRecommendation.Name);
                    cmd.Parameters.AddWithValue("@Content", DbUtils.ValueOrDBNull(consultantRecommendation.Content));
                    cmd.Parameters.AddWithValue("@Email", DbUtils.ValueOrDBNull(consultantRecommendation.Email));
                    cmd.Parameters.AddWithValue("@PhoneNumber", DbUtils.ValueOrDBNull(consultantRecommendation.PhoneNumber));
                    cmd.Parameters.AddWithValue("@ServiceArea", consultantRecommendation.ServiceArea);
                    cmd.Parameters.AddWithValue("@LinkAddress", DbUtils.ValueOrDBNull(consultantRecommendation.LinkAddress));
                    cmd.Parameters.AddWithValue("@CreateDateTime", DateTime.Now);
                    cmd.Parameters.AddWithValue("@SubjectId", consultantRecommendation.SubjectId);
                    cmd.Parameters.AddWithValue("@ResourceTypeId", consultantRecommendation.ResourceTypeId);
                    cmd.Parameters.AddWithValue("@UserProfileId", consultantRecommendation.UserProfileId);

                    consultantRecommendation.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


    }
}
