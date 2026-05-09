using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VotingSystem.Data;
using VotingSystem.Models;

namespace VotingSystem.Controllers
{
    public class HomeController : Controller
    {
        private readonly VotingDbContext _context;

        // Constructor injects the DbContext
        public HomeController(VotingDbContext context)
        {
            _context = context;
        }

        // Action method for the homepage
        public async Task<IActionResult> Index()
        {
            // Fetch all users from database
            var users = await _context.Users.ToListAsync();
            return View(users); // Pass the list to the Razor view
        }
    }
}