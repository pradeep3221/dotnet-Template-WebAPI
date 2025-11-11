namespace MyService.Domain.Exceptions;

public class InvalidTemperatureException : Exception
{
    public InvalidTemperatureException(int temperature)
        : base($"Temperature {temperature}°C is outside the valid range (-100 to 100)")
    {
    }
}
