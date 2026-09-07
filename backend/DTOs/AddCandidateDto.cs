namespace VotingSystem.DTOs
{
    public class AddCandidateDto
    {
        public int UserId { get; set; }

        public string Information { get; set; } = string.Empty;

        public string Manifesto { get; set; } = string.Empty;
    }
}