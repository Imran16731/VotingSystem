using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace VotingSystem.Models
{
    [Table("Votes")]
    public class Vote
    {
        [Column("Id")]
        public int VoteId { get; set; }

        [Column("UserId")]
        public int UserId { get; set; }

        [Column("EventId")]
        public int EventId { get; set; }

        [Column("CandidateId")]
        public int CandidateId { get; set; }

        [Column("CreatedAt")]
        public DateTime CreatedAt { get; set; }
    }
}