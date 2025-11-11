/*#if (UseMapster) */
using Mapster;
using MapsterMapper;
using System.Reflection;

namespace MyService.Api.Extensions;

public static class MapsterExtensions
{
    public static IServiceCollection AddMapster(this IServiceCollection services)
    {
        var config = TypeAdapterConfig.GlobalSettings;
        config.Scan(Assembly.GetExecutingAssembly());

        services.AddSingleton(config);
        services.AddScoped<IMapper, ServiceMapper>();

        return services;
    }
}
/*#endif */
