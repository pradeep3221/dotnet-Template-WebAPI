#if (UseAutoMapper)
using AutoMapper;
using MyService.Domain.Entities;
using MyService.Application.Features.Weather.Commands;

namespace MyService.Infrastructure.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateWeatherCommand, WeatherForecast>();
        CreateMap<UpdateWeatherCommand, WeatherForecast>();
    }
}
#endif
