using FluentAssertions;
using Moq;
using MyService.Application.Features.Weather.Handlers;
using MyService.Application.Features.Weather.Queries;
using MyService.Application.Interfaces;
using MyService.Domain.Entities;
using MyService.Fixtures.Builders;
using Xunit;

namespace MyService.UnitTests.Application;

public class GetWeatherQueryHandlerTests
{
    private readonly Mock<IWeatherService> _mockWeatherService;
    private readonly GetWeatherQueryHandler _handler;

    public GetWeatherQueryHandlerTests()
    {
        _mockWeatherService = new Mock<IWeatherService>();
        _handler = new GetWeatherQueryHandler(_mockWeatherService.Object);
    }

    [Fact]
    public async Task Handle_WithValidId_ReturnsWeatherForecast()
    {
        // Arrange
        var expectedForecast = new WeatherForecastBuilder()
            .WithId(1)
            .WithTemperatureC(25)
            .WithSummary("Sunny")
            .Build();

        _mockWeatherService
            .Setup(s => s.GetWeatherForecastByIdAsync(1, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expectedForecast);

        var query = new GetWeatherQuery(1);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(1);
        result.TemperatureC.Should().Be(25);
        result.Summary.Should().Be("Sunny");
    }

    [Fact]
    public async Task Handle_WithInvalidId_ReturnsNull()
    {
        // Arrange
        _mockWeatherService
            .Setup(s => s.GetWeatherForecastByIdAsync(999, It.IsAny<CancellationToken>()))
            .ReturnsAsync((WeatherForecast?)null);

        var query = new GetWeatherQuery(999);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().BeNull();
    }
}
