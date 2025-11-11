using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using MyService.Domain.Entities;
/*#if (Architecture == "Clean") */
using MyService.Application.Features.Weather.Queries;
using MediatR;
/*#endif */
/*#if (Architecture == "Layered") */
using MyService.Business.Interfaces;
/*#endif */

namespace MyService.Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
/*#if (Architecture == "Clean") */
    private readonly IMediator _mediator;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IActionResult> Get()
    {
        _logger.LogInformation("Getting weather forecast");
        var result = await _mediator.Send(new GetWeatherListQuery());
        return Ok(result);
    }
/*#endif */
/*#if (Architecture == "Layered") */
    private readonly IWeatherService _weatherService;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IWeatherService weatherService)
    {
        _logger = logger;
        _weatherService = weatherService;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IActionResult> Get()
    {
        _logger.LogInformation("Getting weather forecast");
    var result = await _weatherService.GetAllWeatherForecastsAsync();
        return Ok(result);
    }
/*#endif */
/*#if (Architecture == "VerticalSlice") */
    
    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IActionResult Get()
    {
        _logger.LogInformation("Getting weather forecast");
        var forecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
        
        return Ok(forecasts);
    }
/*#endif */
}
