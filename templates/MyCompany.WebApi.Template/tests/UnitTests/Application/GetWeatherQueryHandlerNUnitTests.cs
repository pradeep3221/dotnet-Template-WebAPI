#if (UseNUnit && IsCleanArchitecture)
using FluentAssertions;
using Moq;
using MyService.Application.Features.Weather.Handlers;
using MyService.Application.Features.Weather.Queries;
using MyService.Application.Interfaces;
using MyService.Domain.Entities;
using MyService.Fixtures.Builders;
using NUnit.Framework;

namespace MyService.UnitTests.Application;

[TestFixture]
public class GetWeatherQueryHandlerTests
{
    private Mock<IWeatherService> _mockWeatherService = null!;
    private GetWeatherQueryHandler _handler = null!;

    [SetUp]
    public void Setup()
    {
        _mockWeatherService = new Mock<IWeatherService>();
        _handler = new GetWeatherQueryHandler(_mockWeatherService.Object);
    }

    [Test]
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

    [Test]
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
#endif
