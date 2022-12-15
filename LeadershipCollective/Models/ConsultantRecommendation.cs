using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LeadershipCollective.Models
{
    public class ConsultantRecommendation
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(1000)]
        public string LinkAddress { get; set; }

        [Required]
        [MaxLength(50)]
        public string ServiceArea { get; set; }

        public int SubjectId { get; set; }

        public Subject Subject { get; set; }

        public DateTime DateCreated { get; set; }

        public int ResourceTypeId { get; set; }

        public ResourceType ResourceType { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public List<ConsultantRecMessage> Messages { get; set;}

        public string DateCreatedString => DateCreated.ToString("dddd, dd MMMM yyyy");



    }
}
