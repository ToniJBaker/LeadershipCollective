using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace LeadershipCollective.Models
{
    

    public class UserProfile
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(255)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(255)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public DateTime DateCreated { get; set; }

        [Required]
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }

        public string FullName
        {
            get
            {
                return $"{LastName}, {FirstName} ";
            }
        }
    }
}
