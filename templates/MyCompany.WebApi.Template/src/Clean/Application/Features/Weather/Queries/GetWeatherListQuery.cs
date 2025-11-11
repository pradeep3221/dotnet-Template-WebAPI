using MediatR;
using MyService.Domain.Entities;

namespace MyService.Application.Features.Weather.Queries;

public record GetWeatherListQuery : IRequest<IEnumerable<WeatherForecast>>;
