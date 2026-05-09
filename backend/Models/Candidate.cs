using System.ComponentModel.DataAnnotations.Schema;

namespace VotingSystem.Models
{
    [Table("Candidates")]
    public class Candidate
    {
        [Column("Id")]
        public int CandidateId { get; set; } // C# friendly name

        [Column("Name")]
        public string Name { get; set; }

        [Column("EventId")]
        public int EventId { get; set; } // foreign key
    }
}