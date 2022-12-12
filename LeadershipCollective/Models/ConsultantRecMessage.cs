using System;
using System.ComponentModel.DataAnnotations;

namespace LeadershipCollective.Models
{
    public class ConsultantRecMessage
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(1000)]
        public string Content { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
        public int ConsultantRecommendationId { get; set; }

        public DateTime DateCreated { get; set; }


    }
}
