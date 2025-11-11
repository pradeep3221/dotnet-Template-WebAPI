/*#if (UseXUnit) */
using FluentAssertions;
using MyService.Domain.Entities;
using Xunit;

namespace MyService.UnitTests.Domain;

public class WeatherForecastTests
{
    [Fact]
    public void TemperatureF_CalculatesCorrectly_FromTemperatureC()
    {
        // Arrange
        var forecast = new WeatherForecast
        {
            TemperatureC = 0
        };

        // Act
        var temperatureF = forecast.TemperatureF;

        // Assert
        temperatureF.Should().Be(32);
    }

    [Theory]
    [InlineData(0, 32)]
    [InlineData(100, 212)]
    [InlineData(-40, -40)]
    [InlineData(25, 77)]
    public void TemperatureF_ConvertsCorrectly_ForVariousTemperatures(int celsius, int expectedFahrenheit)
    {
        // Arrange
        var forecast = new WeatherForecast
        {
            TemperatureC = celsius
        };

        // Act
        var temperatureF = forecast.TemperatureF;

        // Assert
        temperatureF.Should().Be(expectedFahrenheit);
    }

    [Fact]
    public void CreatedAt_IsSetAutomatically()
    {
        // Arrange & Act
        var forecast = new WeatherForecast();

        // Assert
        forecast.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
    }
}
/*#endif */
/*#if (UseNUnit) */
using FluentAssertions;
using MyService.Domain.Entities;
using NUnit.Framework;

namespace MyService.UnitTests.Domain;

[TestFixture]
public class WeatherForecastTests
{
    [Test]
    public void TemperatureF_CalculatesCorrectly_FromTemperatureC()
    {
        // Arrange
        var forecast = new WeatherForecast
        {
            TemperatureC = 0
        };

        // Act
        var temperatureF = forecast.TemperatureF;

        // Assert
        temperatureF.Should().Be(32);
    }

    [TestCase(0, 32)]
    [TestCase(100, 212)]
    [TestCase(-40, -40)]
    [TestCase(25, 77)]
    public void TemperatureF_ConvertsCorrectly_ForVariousTemperatures(int celsius, int expectedFahrenheit)
    {
        // Arrange
        var forecast = new WeatherForecast
        {
            TemperatureC = celsius
        };

        // Act
        var temperatureF = forecast.TemperatureF;

        // Assert
        temperatureF.Should().Be(expectedFahrenheit);
    }

    [Test]
    public void CreatedAt_IsSetAutomatically()
    {
        // Arrange & Act
        var forecast = new WeatherForecast();

        // Assert
        forecast.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
    }
}
/*#endif */
