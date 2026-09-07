using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using VotingSystem.Data;
using VotingSystem.DTOs;
using VotingSystem.Models;

namespace VotingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VotingEventController : ControllerBase
    {
        private readonly VotingDbContext _context;

        public VotingEventController(VotingDbContext context)
        {
            _context = context;
        }

        // =========================================================
        // CREATE EVENT
        // =========================================================

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateEvent(CreateEventDto dto)
        {
            try
            {
                if (dto.StartTime >= dto.EndTime)
                {
                    return BadRequest(new
                    {
                        message = "End time must be after start time."
                    });
                }

                // Get logged-in user's ID from JWT
                var userIdClaim =
                    User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!int.TryParse(userIdClaim, out int createdBy))
                {
                    return Unauthorized(new
                    {
                        message = "Invalid user token."
                    });
                }

                var user = await _context.Users.FindAsync(createdBy);

                if (user == null)
                {
                    return NotFound(new
                    {
                        message = "User not found."
                    });
                }

                var newEvent = new Event
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    StartTime = dto.StartTime,
                    EndTime = dto.EndTime,
                    Status = "Upcoming",
                    CreatedBy = createdBy
                };

                _context.Events.Add(newEvent);

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Voting event created successfully.",
                    eventId = newEvent.EventId,
                    name = newEvent.Name,
                    description = newEvent.Description,
                    startTime = newEvent.StartTime,
                    endTime = newEvent.EndTime,
                    status = newEvent.Status,
                    createdBy = newEvent.CreatedBy
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("CREATE EVENT ERROR:");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    message = "Failed to create voting event.",
                    error = ex.Message
                });
            }
        }


        // =========================================================
        // GET ALL EVENTS
        // =========================================================

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            try
            {
                var events = await _context.Events
                    .OrderByDescending(e => e.EventId)
                    .ToListAsync();

                var now = DateTime.UtcNow;

                var result = events.Select(e => new
                {
                    eventId = e.EventId,
                    name = e.Name,
                    description = e.Description,
                    startTime = e.StartTime,
                    endTime = e.EndTime,

                    status =
                        now < e.StartTime
                            ? "Upcoming"
                            : now <= e.EndTime
                                ? "Active"
                                : "Completed",

                    createdBy = e.CreatedBy
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine("GET EVENTS ERROR:");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    message = "Failed to load voting events.",
                    error = ex.Message
                });
            }
        }


        // =========================================================
        // GET ONE EVENT + CANDIDATES
        // =========================================================

        [HttpGet("{eventId}")]
        public async Task<IActionResult> GetEvent(int eventId)
        {
            try
            {
                var votingEvent = await _context.Events
                    .FirstOrDefaultAsync(e => e.EventId == eventId);

                if (votingEvent == null)
                {
                    return NotFound(new
                    {
                        message = "Voting event not found."
                    });
                }

                var candidates = await _context.Candidates
                    .Where(c => c.EventId == eventId)
                    .Join(
                        _context.Users,
                        candidate => candidate.UserId,
                        user => user.UserId,
                        (candidate, user) => new
                        {
                            candidateId = candidate.CandidateId,
                            userId = user.UserId,
                            name = user.Username,
                            email = user.Email,
                            information = candidate.Information,
                            manifesto = candidate.Manifesto
                        })
                    .ToListAsync();

                var now = DateTime.UtcNow;

                string status;

                if (now < votingEvent.StartTime)
                {
                    status = "Upcoming";
                }
                else if (now <= votingEvent.EndTime)
                {
                    status = "Active";
                }
                else
                {
                    status = "Completed";
                }

                return Ok(new
                {
                    eventId = votingEvent.EventId,
                    name = votingEvent.Name,
                    description = votingEvent.Description,
                    startTime = votingEvent.StartTime,
                    endTime = votingEvent.EndTime,
                    status = status,
                    createdBy = votingEvent.CreatedBy,
                    candidates = candidates
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("GET EVENT ERROR:");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    message = "Failed to load voting event.",
                    error = ex.Message
                });
            }
        }


        // =========================================================
        // ADD CANDIDATE
        // =========================================================

        [Authorize]
        [HttpPost("{eventId}/candidates")]
        public async Task<IActionResult> AddCandidate(
            int eventId,
            AddCandidateDto dto)
        {
            try
            {
                var votingEvent = await _context.Events
                    .FindAsync(eventId);

                if (votingEvent == null)
                {
                    return NotFound(new
                    {
                        message = "Voting event not found."
                    });
                }

                var user = await _context.Users
                    .FindAsync(dto.UserId);

                if (user == null)
                {
                    return NotFound(new
                    {
                        message = "Candidate user does not exist."
                    });
                }

                var alreadyCandidate = await _context.Candidates
                    .AnyAsync(c =>
                        c.EventId == eventId &&
                        c.UserId == dto.UserId);

                if (alreadyCandidate)
                {
                    return BadRequest(new
                    {
                        message = "This user is already a candidate."
                    });
                }

                var candidate = new Candidate
                {
                    UserId = dto.UserId,
                    EventId = eventId,
                    Information = dto.Information,
                    Manifesto = dto.Manifesto
                };

                _context.Candidates.Add(candidate);

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Candidate added successfully.",
                    candidateId = candidate.CandidateId
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("ADD CANDIDATE ERROR:");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    message = "Failed to add candidate.",
                    error = ex.Message
                });
            }
        }


        // =========================================================
        // GET CANDIDATE DETAILS
        // =========================================================

        [HttpGet("candidates/{candidateId}")]
        public async Task<IActionResult> GetCandidate(int candidateId)
        {
            try
            {
                var candidate = await _context.Candidates
                    .Where(c => c.CandidateId == candidateId)
                    .Join(
                        _context.Users,
                        candidate => candidate.UserId,
                        user => user.UserId,
                        (candidate, user) => new
                        {
                            candidateId = candidate.CandidateId,
                            eventId = candidate.EventId,
                            userId = user.UserId,
                            name = user.Username,
                            email = user.Email,
                            information = candidate.Information,
                            manifesto = candidate.Manifesto
                        })
                    .FirstOrDefaultAsync();

                if (candidate == null)
                {
                    return NotFound(new
                    {
                        message = "Candidate not found."
                    });
                }

                return Ok(candidate);
            }
            catch (Exception ex)
            {
                Console.WriteLine("GET CANDIDATE ERROR:");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    message = "Failed to load candidate.",
                    error = ex.Message
                });
            }
        }
    }
}