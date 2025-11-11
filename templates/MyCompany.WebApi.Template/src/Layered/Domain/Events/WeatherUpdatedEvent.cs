namespace MyService.Domain.Events;

public record WeatherUpdatedEvent(int Id, DateTime Date, int TemperatureC, string? Summary);
