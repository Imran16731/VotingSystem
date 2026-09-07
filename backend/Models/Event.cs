using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace VotingSystem.Models
{
    [Table("Events")]
    public class Event
    {
        [Column("Id")]
        public int EventId { get; set; }

        [Column("Name")]
        public string Name { get; set; } = string.Empty;

        [Column("Description")]
        public string Description { get; set; } = string.Empty;

        [Column("StartTime")]
        public DateTime StartTime { get; set; }

        [Column("EndTime")]
        public DateTime EndTime { get; set; }

        [Column("Status")]
        public string Status { get; set; } = "Upcoming";

        [Column("CreatedBy")]
        public int CreatedBy { get; set; }
    }
}