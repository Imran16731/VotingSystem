using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using VotingSystem.Data;
using VotingSystem.DTOs;
using VotingSystem.Models;
using VotingSystem.Services;

namespace VotingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly VotingDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(
            VotingDbContext context,
            JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }


        // =========================================================
        // REGISTER
        // =========================================================

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (dto.Password != dto.ConfirmPassword)
            {
                return BadRequest(new
                {
                    message = "Passwords do not match"
                });
            }

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (existingUser != null)
            {
                return BadRequest(new
                {
                    message = "Email already exists"
                });
            }

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                Password = dto.Password,
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };

            await _context.Users.AddAsync(user);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Registration successful",
                userId = user.UserId
            });
        }


        // =========================================================
        // LOGIN
        // =========================================================

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u =>
                    u.Email == dto.Email &&
                    u.Password == dto.Password);

            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Invalid email or password"
                });
            }

            var token = _jwtService.GenerateToken(user);

            return Ok(new
            {
                message = "Login successful",
                token,
                userId = user.UserId,
                username = user.Username,
                email = user.Email,
                role = user.Role
            });
        }


        // =========================================================
        // PROFILE
        // =========================================================

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            if (email == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid token."
                });
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found."
                });
            }

            return Ok(new
            {
                userId = user.UserId,
                username = user.Username,
                email = user.Email,
                role = user.Role
            });
        }
    }
}