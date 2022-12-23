using System.ComponentModel.DataAnnotations;
using System;

namespace LeadershipCollective.Models
{
    public class MediaRecMessage
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
        public int MediaRecommendationId { get; set; }

        public DateTime DateCreated { get; set; }

        public string DateCreatedString => DateCreated.ToString("dddd, dd MMMM yyyy");
    }
}
