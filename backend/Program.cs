using Microsoft.EntityFrameworkCore;
using VotingSystem.Data;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add services
builder.Services.AddOpenApi(); // your OpenAPI/Swagger
builder.Services.AddControllers(); // API controllers
builder.Services.AddControllersWithViews(); // MVC / homepage

builder.Services.AddDbContext<VotingDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// ✅ Configure middleware
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Required for serving Razor views, CSS, JS

app.UseRouting();

// ✅ Add MVC routing for homepage
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// ✅ Keep API controllers working
app.MapControllers();

app.Run();