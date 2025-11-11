/*#if (IsLayeredArchitecture) */
using MyService.Domain.Entities;
namespace MyService.Business.Interfaces;

public interface IWeatherService
{
    Task<IEnumerable<WeatherForecast>> GetAllWeatherForecastsAsync(CancellationToken cancellationToken = default);
    Task<WeatherForecast?> GetWeatherForecastByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
    Task UpdateWeatherForecastAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
    Task DeleteWeatherForecastAsync(int id, CancellationToken cancellationToken = default);
}
/*#endif */
