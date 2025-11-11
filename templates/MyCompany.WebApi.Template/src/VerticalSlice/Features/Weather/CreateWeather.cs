/*#if (IsVerticalSlice) */
using FluentValidation;
using MediatR;
using MyService.Domain.Entities;
using MyService.Infrastructure.Interfaces;

namespace MyService.Features.Weather;

// Command
public record CreateWeatherCommand(
    DateTime Date,
    int TemperatureC,
    string? Summary
) : IRequest<WeatherForecast>;

// Validator
public class CreateWeatherCommandValidator : AbstractValidator<CreateWeatherCommand>
{
    public CreateWeatherCommandValidator()
    {
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.TemperatureC).InclusiveBetween(-100, 100);
        RuleFor(x => x.Summary).MaximumLength(200);
    }
}

// Handler
public class CreateWeatherCommandHandler : IRequestHandler<CreateWeatherCommand, WeatherForecast>
{
    private readonly IWeatherRepository _repository;

    public CreateWeatherCommandHandler(IWeatherRepository repository)
    {
        _repository = repository;
    }

    public async Task<WeatherForecast> Handle(CreateWeatherCommand request, CancellationToken cancellationToken)
    {
        var forecast = new WeatherForecast
        {
            Date = request.Date,
            TemperatureC = request.TemperatureC,
            Summary = request.Summary,
            CreatedAt = DateTime.UtcNow
        };

        return await _repository.AddAsync(forecast, cancellationToken);
    }
}
/*#endif */
