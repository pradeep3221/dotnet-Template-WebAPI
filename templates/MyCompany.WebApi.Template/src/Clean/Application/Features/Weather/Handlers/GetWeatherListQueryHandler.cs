using MediatR;
using MyService.Application.Features.Weather.Queries;
using MyService.Application.Interfaces;
using MyService.Domain.Entities;

namespace MyService.Application.Features.Weather.Handlers;

public class GetWeatherListQueryHandler : IRequestHandler<GetWeatherListQuery, IEnumerable<WeatherForecast>>
{
    private readonly IWeatherService _weatherService;

    public GetWeatherListQueryHandler(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    public async Task<IEnumerable<WeatherForecast>> Handle(GetWeatherListQuery request, CancellationToken cancellationToken)
    {
        return await _weatherService.GetWeatherForecastsAsync(cancellationToken);
    }
}
