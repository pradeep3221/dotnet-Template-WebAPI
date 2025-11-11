/*#if (IsVerticalSlice) */
using MediatR;
using MyService.Domain.Entities;
using MyService.Infrastructure.Interfaces;

namespace MyService.Features.Weather;

// Query
public record GetWeatherQuery(int Id) : IRequest<WeatherForecast?>;

// Handler
public class GetWeatherQueryHandler : IRequestHandler<GetWeatherQuery, WeatherForecast?>
{
    private readonly IWeatherRepository _repository;

    public GetWeatherQueryHandler(IWeatherRepository repository)
    {
        _repository = repository;
    }

    public async Task<WeatherForecast?> Handle(GetWeatherQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetByIdAsync(request.Id, cancellationToken);
    }
}
/*#endif */
