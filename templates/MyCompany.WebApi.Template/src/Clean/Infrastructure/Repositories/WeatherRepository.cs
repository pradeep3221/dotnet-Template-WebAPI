/*#if (UseEFCore) */
using Microsoft.EntityFrameworkCore;
using MyService.Domain.Entities;
using MyService.Infrastructure.Persistence;

namespace MyService.Infrastructure.Repositories;

public class WeatherRepository : IWeatherRepository
{
    private readonly MyServiceDbContext _context;

    public WeatherRepository(MyServiceDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<WeatherForecast>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.WeatherForecasts
            .OrderByDescending(w => w.Date)
            .ToListAsync(cancellationToken);
    }

    public async Task<WeatherForecast?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.WeatherForecasts
            .FirstOrDefaultAsync(w => w.Id == id, cancellationToken);
    }

    public async Task<WeatherForecast> AddAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        _context.WeatherForecasts.Add(forecast);
        await _context.SaveChangesAsync(cancellationToken);
        return forecast;
    }

    public async Task UpdateAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        forecast.UpdatedAt = DateTime.UtcNow;
        _context.WeatherForecasts.Update(forecast);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var forecast = await GetByIdAsync(id, cancellationToken);
        if (forecast != null)
        {
            _context.WeatherForecasts.Remove(forecast);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}

public interface IWeatherRepository
{
    Task<IEnumerable<WeatherForecast>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<WeatherForecast?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<WeatherForecast> AddAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
    Task UpdateAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}
/*#endif */
