using System;
using System.ComponentModel.DataAnnotations;

namespace LeadershipCollective.Models
{
    public class LeadershipEvent
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        public DateTime Date { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string Location { get; set; }
        
        [Required]
        [MaxLength(1000)]
        public string LinkAddress { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; }
    }
}
