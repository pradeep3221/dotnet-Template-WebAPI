namespace MyService.Infrastructure.Interfaces;

using MyService.Domain.Entities;

public interface IWeatherService
{
    Task<IEnumerable<WeatherForecast>> GetWeatherForecastsAsync(CancellationToken cancellationToken = default);
    Task<WeatherForecast?> GetWeatherForecastByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
}