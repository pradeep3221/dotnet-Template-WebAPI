/*#if (IsLayeredArchitecture) */
using MyService.Domain.Entities;
namespace MyService.Data.Interfaces;

public interface IWeatherRepository
{
    Task<IEnumerable<WeatherForecast>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<WeatherForecast?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<WeatherForecast> AddAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
    Task UpdateAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}
/*#endif */
