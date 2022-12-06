using System.ComponentModel.DataAnnotations;

namespace LeadershipCollective.Models
{
    public class ResoureType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
    }
}
