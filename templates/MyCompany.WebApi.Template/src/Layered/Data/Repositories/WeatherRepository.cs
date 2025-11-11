/*#if (IsLayeredArchitecture && UseEFCore) */
using Microsoft.EntityFrameworkCore;
using MyService.Data.Context;
using MyService.Data.Interfaces;
using MyService.Domain.Entities;

namespace MyService.Data.Repositories;

public class WeatherRepository : IWeatherRepository
{
    private readonly AppDbContext _context;

    public WeatherRepository(AppDbContext context)
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
/*#endif */
