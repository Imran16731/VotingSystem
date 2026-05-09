using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace VotingSystem.Models
{
    [Table("Events")]
    public class Event
    {
        [Column("Id")]
        public int EventId { get; set; } // C# friendly name

        [Column("Name")]
        public string Name { get; set; }

        [Column("Description")]
        public string Description { get; set; }

        [Column("StartTime")]
        public DateTime StartTime { get; set; }

        [Column("EndTime")]
        public DateTime EndTime { get; set; }

        [Column("Status")]
        public string Status { get; set; }

        [Column("CreatedBy")]
        public int CreatedBy { get; set; }
    }
}