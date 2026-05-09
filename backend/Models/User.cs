using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace VotingSystem.Models
{
    [Table("Users")] // matches table name
    public class User
    {
        [Column("Id")]
        public int UserId { get; set; }  // C# friendly name

        [Column("Name")]
        public string Username { get; set; } // maps to SQL column "Name"

        [Column("Email")]
        public string Email { get; set; }

        [Column("Password")]
        public string Password { get; set; }

        [Column("Role")]
        public string Role { get; set; }

        [Column("CreatedAt")]
        public DateTime CreatedAt { get; set; }
    }
}