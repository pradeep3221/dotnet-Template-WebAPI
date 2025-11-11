/*#if (UseEFCore) */
using Microsoft.EntityFrameworkCore;
using MyService.Domain.Entities;

namespace MyService.Infrastructure.Persistence;

public class MyServiceDbContext : DbContext
{
    public MyServiceDbContext(DbContextOptions<MyServiceDbContext> options)
        : base(options)
    {
    }

    public DbSet<WeatherForecast> WeatherForecasts => Set<WeatherForecast>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MyServiceDbContext).Assembly);
    }
}
/*#endif */
