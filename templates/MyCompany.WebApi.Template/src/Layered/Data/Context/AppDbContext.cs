/*#if (IsLayeredArchitecture && UseEFCore) */
using Microsoft.EntityFrameworkCore;
using MyService.Domain.Entities;

namespace MyService.Data.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<WeatherForecast> WeatherForecasts => Set<WeatherForecast>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<WeatherForecast>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Date).IsRequired();
            entity.Property(e => e.TemperatureC).IsRequired();
            entity.Property(e => e.Summary).HasMaxLength(200);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.HasIndex(e => e.Date);
        });
    }
}
/*#endif */
