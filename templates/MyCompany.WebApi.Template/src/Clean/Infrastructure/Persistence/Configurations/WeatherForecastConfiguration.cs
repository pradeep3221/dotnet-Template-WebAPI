/*#if (UseEFCore) */
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyService.Domain.Entities;

namespace MyService.Infrastructure.Persistence.Configurations;

public class WeatherForecastConfiguration : IEntityTypeConfiguration<WeatherForecast>
{
    public void Configure(EntityTypeBuilder<WeatherForecast> builder)
    {
        builder.HasKey(w => w.Id);

        builder.Property(w => w.Date)
            .IsRequired();

        builder.Property(w => w.TemperatureC)
            .IsRequired();

        builder.Property(w => w.Summary)
            .HasMaxLength(200);

        builder.Property(w => w.CreatedAt)
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()");

        builder.HasIndex(w => w.Date);
    }
}
/*#endif */
