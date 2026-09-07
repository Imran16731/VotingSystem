using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using VotingSystem.Data;
using VotingSystem.Models;

namespace VotingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VoteController : ControllerBase
    {
        private readonly VotingDbContext _context;

        public VoteController(VotingDbContext context)
        {
            _context = context;
        }

        // =========================================================
        // CAST VOTE
        // =========================================================

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CastVote([FromBody] Vote vote)
        {
            try
            {
                // Get logged-in user's ID from JWT
                var userIdClaim =
                    User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return Unauthorized(new
                    {
                        message = "Invalid user authentication."
                    });
                }

                // Check event
                var votingEvent = await _context.Events
                    .FirstOrDefaultAsync(e =>
                        e.EventId == vote.EventId);

                if (votingEvent == null)
                {
                    return NotFound(new
                    {
                        message = "Voting event not found."
                    });
                }

                // Check whether event is active
                if (votingEvent.Status != "Active")
                {
                    return BadRequest(new
                    {
                        message = "Voting is not currently active for this event."
                    });
                }

                // Check candidate belongs to this event
                var candidate = await _context.Candidates
                    .FirstOrDefaultAsync(c =>
                        c.CandidateId == vote.CandidateId &&
                        c.EventId == vote.EventId);

                if (candidate == null)
                {
                    return BadRequest(new
                    {
                        message = "Candidate does not belong to this event."
                    });
                }

                // =====================================================
                // ONE USER = ONE VOTE PER EVENT
                // =====================================================

                var alreadyVoted = await _context.Votes
                    .AnyAsync(v =>
                        v.UserId == userId &&
                        v.EventId == vote.EventId);

                if (alreadyVoted)
                {
                    return BadRequest(new
                    {
                        message = "You have already voted in this election."
                    });
                }

                // Never trust UserId sent from frontend
                var newVote = new Vote
                {
                    UserId = userId,
                    EventId = vote.EventId,
                    CandidateId = vote.CandidateId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Votes.Add(newVote);

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Vote submitted successfully.",
                    voteId = newVote.VoteId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Failed to submit vote.",
                    error = ex.Message
                });
            }
        }


        // =========================================================
        // CHECK WHETHER CURRENT USER HAS VOTED
        // =========================================================

        [Authorize]
        [HttpGet("event/{eventId}/has-voted")]
        public async Task<IActionResult> HasVoted(int eventId)
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new
                {
                    message = "Invalid user authentication."
                });
            }

            var hasVoted = await _context.Votes
                .AnyAsync(v =>
                    v.UserId == userId &&
                    v.EventId == eventId);

            return Ok(new
            {
                hasVoted
            });
        }


        // =========================================================
        // DASHBOARD STATISTICS
        // =========================================================

        [Authorize]
        [HttpGet("dashboard-stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var activeEvents = await _context.Events
                .CountAsync(e => e.Status == "Active");

            var totalVotes = await _context.Votes
                .CountAsync();

            var totalCandidates = await _context.Candidates
                .CountAsync();

            return Ok(new
            {
                activeEvents,
                totalVotes,
                totalCandidates
            });
        }


        // =========================================================
        // EVENT RESULTS
        // =========================================================

        [Authorize]
        [HttpGet("event/{eventId}/results")]
        public async Task<IActionResult> GetEventResults(int eventId)
        {
            var votingEvent = await _context.Events
                .FirstOrDefaultAsync(e =>
                    e.EventId == eventId);

            if (votingEvent == null)
            {
                return NotFound(new
                {
                    message = "Voting event not found."
                });
            }

            var candidates = await _context.Candidates
                .Where(c => c.EventId == eventId)
                .ToListAsync();

            var totalVotes = await _context.Votes
                .CountAsync(v => v.EventId == eventId);

            var results = new List<object>();

            foreach (var candidate in candidates)
            {
                var voteCount = await _context.Votes
                    .CountAsync(v =>
                        v.EventId == eventId &&
                        v.CandidateId == candidate.CandidateId);

                var percentage = totalVotes > 0
                    ? Math.Round(
                        (double)voteCount / totalVotes * 100,
                        2)
                    : 0;

                var user = await _context.Users
                    .FirstOrDefaultAsync(u =>
                        u.UserId == candidate.UserId);

                results.Add(new
                {
                    candidateId = candidate.CandidateId,
                    userId = candidate.UserId,

                    name = user?.Username ?? "Unknown Candidate",

                    information = candidate.Information,
                    manifesto = candidate.Manifesto,

                    voteCount,
                    percentage
                });
            }

            return Ok(new
            {
                eventId = votingEvent.EventId,
                eventName = votingEvent.Name,
                eventStatus = votingEvent.Status,

                totalVotes,

                results
            });
        }
    }
}