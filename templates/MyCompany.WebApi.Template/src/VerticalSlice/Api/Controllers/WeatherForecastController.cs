using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using MyService.Domain.Entities;
using MediatR;
using MyService.Features.Weather;

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
    private readonly IMediator _mediator;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IActionResult> Get()
    {
        _logger.LogInformation("Getting weather forecast (list)");
        var result = await _mediator.Send(new ListWeatherQuery());
        return Ok(result);
    }

    [HttpGet("{id:int}", Name = "GetWeatherForecastById")]
    public async Task<IActionResult> GetById(int id)
    {
        _logger.LogInformation("Getting weather forecast by id {Id}", id);
        var forecast = await _mediator.Send(new GetWeatherQuery(id));
        return forecast is not null ? Ok(forecast) : NotFound();
    }

    [HttpPost(Name = "CreateWeatherForecast")]
    public async Task<IActionResult> Create([FromBody] CreateWeatherCommand command)
    {
        _logger.LogInformation("Creating weather forecast");
        var created = await _mediator.Send(command);
        return CreatedAtRoute("GetWeatherForecastById", new { id = created.Id }, created);
    }
 
}
