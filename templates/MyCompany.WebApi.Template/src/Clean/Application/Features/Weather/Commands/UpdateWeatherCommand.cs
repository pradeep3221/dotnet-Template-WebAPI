using MediatR;
using MyService.Domain.Entities;

namespace MyService.Application.Features.Weather.Commands;

public record UpdateWeatherCommand(
    int Id,
    DateTime Date,
    int TemperatureC,
    string? Summary
) : IRequest<WeatherForecast?>;
