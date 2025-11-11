using MyService.Infrastructure.Interfaces;
using MyService.Domain.Entities;
/*#if (UseEFCore) */
using MyService.Infrastructure.Repositories;
/*#endif */

namespace MyService.Infrastructure.Services;

public class WeatherService : IWeatherService
{
    private readonly IWeatherRepository? _repository; // optional when not using EFCore

/*#if (UseEFCore) */
    public WeatherService(IWeatherRepository repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<WeatherForecast>> GetWeatherForecastsAsync(CancellationToken cancellationToken = default)
        => _repository!.GetAllAsync(cancellationToken);

    public Task<WeatherForecast?> GetWeatherForecastByIdAsync(int id, CancellationToken cancellationToken = default)
        => _repository!.GetByIdAsync(id, cancellationToken);

    public Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
        => _repository!.AddAsync(forecast, cancellationToken);
/*#else */
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    public WeatherService() { }

    public Task<IEnumerable<WeatherForecast>> GetWeatherForecastsAsync(CancellationToken cancellationToken = default)
    {
        var forecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Id = index,
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        });
        return Task.FromResult(forecasts);
    }

    public Task<WeatherForecast?> GetWeatherForecastByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var forecast = new WeatherForecast
        {
            Id = id,
            Date = DateTime.Now.AddDays(id),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        };
        return Task.FromResult<WeatherForecast?>(forecast);
    }

    public Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        forecast.Id = Random.Shared.Next(1, 1000);
        return Task.FromResult(forecast);
    }
/*#endif */
}
