/*#if (UseAutoMapper) */
using AutoMapper;
using MyService.Domain.Entities;
using MyService.Features.Weather;
using MediatR;

namespace MyService.Features.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
    CreateMap<CreateWeatherCommand, WeatherForecast>();
    }
}
/*#endif */
