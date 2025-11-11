using FluentValidation;
using MyService.Application.Features.Weather.Commands;

namespace MyService.Application.Features.Weather.Validators;

public class CreateWeatherCommandValidator : AbstractValidator<CreateWeatherCommand>
{
    public CreateWeatherCommandValidator()
    {
        RuleFor(x => x.Date)
            .NotEmpty()
            .WithMessage("Date is required");

        RuleFor(x => x.TemperatureC)
            .InclusiveBetween(-100, 100)
            .WithMessage("Temperature must be between -100 and 100 degrees Celsius");

        RuleFor(x => x.Summary)
            .MaximumLength(200)
            .WithMessage("Summary must not exceed 200 characters");
    }
}
