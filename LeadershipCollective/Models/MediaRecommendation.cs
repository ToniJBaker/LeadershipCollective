using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LeadershipCollective.Models
{
    public class MediaRecommendation
    {
        public int Id { get; set; }
       
        [Required]
        [MaxLength(1000)]
        public string Content { get; set; }
        
        public DateTime DateCreated { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string Author { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string Title { get; set; }
       
        [Required]
        [MaxLength(1000)]
        public string LinkAddress { get; set; }
       
        public DateTime PublicationDate { get; set; }


        public int ResourceTypeId { get; set; }

        public ResourceType ResourceType { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

       
        public int SubjectId { get; set; }

        public Subject Subject { get; set; }
        //public List<MediaRecMessage> Messages { get; set; }

    }
}
