using MyService.Domain.Entities;

namespace MyService.Application.Interfaces;

public interface IWeatherService
{
    Task<IEnumerable<WeatherForecast>> GetWeatherForecastsAsync(CancellationToken cancellationToken = default);
    Task<WeatherForecast?> GetWeatherForecastByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
}
