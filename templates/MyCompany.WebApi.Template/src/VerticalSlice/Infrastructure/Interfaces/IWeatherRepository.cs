namespace MyService.Infrastructure.Interfaces;

using MyService.Domain.Entities;

public interface IWeatherRepository
{
    Task<IEnumerable<WeatherForecast>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<WeatherForecast?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<WeatherForecast> AddAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
    Task UpdateAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}
