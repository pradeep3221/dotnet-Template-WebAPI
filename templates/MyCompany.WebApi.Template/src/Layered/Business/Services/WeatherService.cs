/*#if (IsLayeredArchitecture) */
using MyService.Business.Interfaces;
using MyService.Data.Interfaces;
using MyService.Domain.Entities;

namespace MyService.Business.Services;

public class WeatherService : IWeatherService
{
    private readonly IWeatherRepository _repository;

    public WeatherService(IWeatherRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<WeatherForecast>> GetAllWeatherForecastsAsync(CancellationToken cancellationToken = default)
    {
        return await _repository.GetAllAsync(cancellationToken);
    }

    public async Task<WeatherForecast?> GetWeatherForecastByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _repository.GetByIdAsync(id, cancellationToken);
    }

    public async Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        // Add business logic here
        ValidateWeatherForecast(forecast);
        
        return await _repository.AddAsync(forecast, cancellationToken);
    }

    public async Task UpdateWeatherForecastAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        ValidateWeatherForecast(forecast);
        
        await _repository.UpdateAsync(forecast, cancellationToken);
    }

    public async Task DeleteWeatherForecastAsync(int id, CancellationToken cancellationToken = default)
    {
        await _repository.DeleteAsync(id, cancellationToken);
    }

    private static void ValidateWeatherForecast(WeatherForecast forecast)
    {
        if (forecast.TemperatureC < -100 || forecast.TemperatureC > 100)
        {
            throw new ArgumentOutOfRangeException(nameof(forecast.TemperatureC), 
                "Temperature must be between -100 and 100 degrees Celsius");
        }
    }
}
/*#endif */
