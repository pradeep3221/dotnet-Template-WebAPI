using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using MyService.Domain.Entities;
using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace MyService.IntegrationTests.Api;

public class WeatherControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public WeatherControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetWeatherForecast_ReturnsSuccessStatusCode()
    {
        // Act
        var response = await _client.GetAsync("/api/weather");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetWeatherForecast_ReturnsListOfForecasts()
    {
        // Act
        var forecasts = await _client.GetFromJsonAsync<IEnumerable<WeatherForecast>>("/api/weather");

        // Assert
        forecasts.Should().NotBeNull();
        forecasts.Should().NotBeEmpty();
    }

    [Fact]
    public async Task GetWeatherById_WithValidId_ReturnsWeatherForecast()
    {
        // Act
        var response = await _client.GetAsync("/api/weather/1");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var forecast = await response.Content.ReadFromJsonAsync<WeatherForecast>();
        forecast.Should().NotBeNull();
    }
}
