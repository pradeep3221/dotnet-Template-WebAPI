/*#if (Architecture == "VerticalSlice") */
using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using MyService.Domain.Entities;
using MyService.Features.Weather;
using Xunit;

namespace MyService.IntegrationTests.Api;

public class WeatherVerticalSliceTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public WeatherVerticalSliceTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task List_ReturnsOk()
    {
        var response = await _client.GetAsync("/api/v1.0/WeatherForecast");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Create_Then_GetById_Works()
    {
        var cmd = new CreateWeatherCommand(DateTime.UtcNow, 25, "Sunny");
        var createResponse = await _client.PostAsJsonAsync("/api/v1.0/WeatherForecast", cmd);
        createResponse.StatusCode.Should().Be(HttpStatusCode.Created);
        var created = await createResponse.Content.ReadFromJsonAsync<WeatherForecast>();
        created.Should().NotBeNull();
        created!.Id.Should().BeGreaterThan(0);

        var getResponse = await _client.GetAsync($"/api/v1.0/WeatherForecast/{created.Id}");
        getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var fetched = await getResponse.Content.ReadFromJsonAsync<WeatherForecast>();
        fetched.Should().NotBeNull();
        fetched!.Id.Should().Be(created.Id);
    }
}
/*#endif */
