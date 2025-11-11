using Microsoft.Extensions.DependencyInjection;
using MyService.Application.Interfaces;
using MyService.Infrastructure.Services;
/*#if (UseEFCore) */
using Microsoft.EntityFrameworkCore;
using MyService.Infrastructure.Persistence;
using MyService.Infrastructure.Repositories;
/*#endif */
/*#if (UseAutoMapper) */
using AutoMapper;
/*#endif */
/*#if (UseMapster) */
using Mapster;
using MapsterMapper;
/*#endif */

namespace MyService.Infrastructure.Extensions;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        string connectionString)
    {
/*#if (UseEFCore) */
        // Database Context
        services.AddDbContext<MyServiceDbContext>(options =>
        {
/*#if (DatabaseProvider == "SqlServer") */
            options.UseSqlServer(connectionString);
/*#elif (DatabaseProvider == "PostgreSQL") */
            options.UseNpgsql(connectionString);
/*#elif (DatabaseProvider == "MySQL") */
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
/*#elif (DatabaseProvider == "SQLite") */
            options.UseSqlite(connectionString);
/*#else */
            options.UseInMemoryDatabase("MyServiceDb");
/*#endif */
        });

        // Repositories
        services.AddScoped<IWeatherRepository, WeatherRepository>();
/*#endif */

        // Services
        services.AddScoped<IWeatherService, WeatherService>();

/*#if (UseAutoMapper) */
        // AutoMapper
        services.AddAutoMapper(typeof(InfrastructureServiceRegistration).Assembly);
/*#endif */

/*#if (UseMapster) */
        // Mapster
        var config = TypeAdapterConfig.GlobalSettings;
        config.Scan(typeof(InfrastructureServiceRegistration).Assembly);
        services.AddSingleton(config);
        services.AddScoped<IMapper, ServiceMapper>();
/*#endif */

        return services;
    }
}
