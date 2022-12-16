using System.ComponentModel.DataAnnotations;

namespace LeadershipCollective.Models
{
    public class Subject
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
    }
}
