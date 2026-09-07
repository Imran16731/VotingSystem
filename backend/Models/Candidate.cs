using System.ComponentModel.DataAnnotations.Schema;

namespace VotingSystem.Models
{
    [Table("Candidates")]
    public class Candidate
    {
        [Column("Id")]
        public int CandidateId { get; set; }

        [Column("UserId")]
        public int UserId { get; set; }

        [Column("EventId")]
        public int EventId { get; set; }

        [Column("Information")]
        public string Information { get; set; } = string.Empty;

        [Column("Manifesto")]
        public string Manifesto { get; set; } = string.Empty;
    }
}