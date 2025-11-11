/*#if (IsVerticalSlice) */
using MediatR;
using MyService.Domain.Entities;
using MyService.Infrastructure.Interfaces;

namespace MyService.Features.Weather;

// Query
public record ListWeatherQuery : IRequest<IEnumerable<WeatherForecast>>;

// Handler
public class ListWeatherQueryHandler : IRequestHandler<ListWeatherQuery, IEnumerable<WeatherForecast>>
{
    private readonly IWeatherRepository _repository;

    public ListWeatherQueryHandler(IWeatherRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<WeatherForecast>> Handle(ListWeatherQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetAllAsync(cancellationToken);
    }
}
/*#endif */
