using MyService.Domain.Entities;

namespace MyService.Fixtures.Builders;

public class WeatherForecastBuilder
{
    private int _id = 1;
    private DateTime _date = DateTime.Now;
    private int _temperatureC = 20;
    private string? _summary = "Mild";

    public WeatherForecastBuilder WithId(int id)
    {
        _id = id;
        return this;
    }

    public WeatherForecastBuilder WithDate(DateTime date)
    {
        _date = date;
        return this;
    }

    public WeatherForecastBuilder WithTemperatureC(int temperatureC)
    {
        _temperatureC = temperatureC;
        return this;
    }

    public WeatherForecastBuilder WithSummary(string? summary)
    {
        _summary = summary;
        return this;
    }

    public WeatherForecast Build()
    {
        return new WeatherForecast
        {
            Id = _id,
            Date = _date,
            TemperatureC = _temperatureC,
            Summary = _summary,
            CreatedAt = DateTime.UtcNow
        };
    }
}
