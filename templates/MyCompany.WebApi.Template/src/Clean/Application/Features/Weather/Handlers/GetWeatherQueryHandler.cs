using MediatR;
using MyService.Application.Features.Weather.Queries;
using MyService.Application.Interfaces;
using MyService.Domain.Entities;

namespace MyService.Application.Features.Weather.Handlers;

public class GetWeatherQueryHandler : IRequestHandler<GetWeatherQuery, WeatherForecast?>
{
    private readonly IWeatherService _weatherService;

    public GetWeatherQueryHandler(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    public async Task<WeatherForecast?> Handle(GetWeatherQuery request, CancellationToken cancellationToken)
    {
        return await _weatherService.GetWeatherForecastByIdAsync(request.Id, cancellationToken);
    }
}
