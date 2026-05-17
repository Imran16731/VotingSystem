using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace VotingSystem.Models
{
    [Table("Users")]
    public class User
    {
        [Column("Id")]
        public int UserId { get; set; }

        [Column("Name")]
        public string Username { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("Password")]
        public string Password { get; set; }

        [Column("Role")]
        public string Role { get; set; } = "User";

        [Column("CreatedAt")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}