/*#if (UseSerilog) */
using Serilog;
/*#endif */
using MyService.Api.Extensions;
/*#if (IsCleanArchitecture) */
using MyService.Application.Behaviors;
using FluentValidation;
using MediatR;
/*#endif */
/*#if (IsLayeredArchitecture) */
using MyService.Business.Interfaces;
using MyService.Business.Services;
using MyService.Data.Interfaces;
using MyService.Data.Context;
using MyService.Data.Repositories;
/*#endif */
/*#if (IsVerticalSlice) */
using MyService.Shared.Behaviors;
using MyService.Features.Weather;
/*#endif */
/*#if (UseEFCore) */
using Microsoft.EntityFrameworkCore;
/*#endif */
/*#if (IsCleanArchitecture || IsVerticalSlice) */
using MyService.Infrastructure.Extensions;
/*#endif */

/*#if (UseSerilog) */
// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .Enrich.FromLogContext()
    .CreateLogger();

try
{
    Log.Information("Starting MyService API");
/*#endif */

    var builder = WebApplication.CreateBuilder(args);

/*#if (UseSerilog) */
    // Add Serilog
    builder.Host.UseSerilog();
/*#endif */

    // Add services to the container
/*#if (UseMinimalApis) */
    builder.Services.AddEndpointsApiExplorer();
/*#else */
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
/*#endif */

/*#if (UseSwagger) */
    // Configure Swagger
    builder.Services.AddSwaggerConfiguration();
/*#endif */

    // Configure API Versioning
    builder.Services.AddApiVersioningConfiguration();

    // Configure Authentication
/*#if (UseJWT) */
    builder.Services.AddJwtAuthentication(builder.Configuration);
/*#endif */
/*#if (UseOAuth2) */
    builder.Services.AddOAuth2Authentication(builder.Configuration);
/*#endif */

    // Configure CORS
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll", policy =>
        {
            policy.WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? new[] { "*" })
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
    });

    // Configure Caching
/*#if (UseHybridCache) */
    builder.Services.AddHybridCache(options =>
    {
        options.DefaultEntryOptions = new()
        {
            Expiration = TimeSpan.FromMinutes(5),
            LocalCacheExpiration = TimeSpan.FromMinutes(5)
        };
    });
/*#endif */
/*#if (UseRedis && !UseHybridCache) */
    builder.Services.AddStackExchangeRedisCache(options =>
    {
        options.Configuration = builder.Configuration.GetConnectionString("Redis");
    });
/*#endif */
/*#if (UseInMemoryCache) */
    builder.Services.AddMemoryCache();
/*#endif */

/*#if (UseHealthChecks) */
    // Add Health Checks
    var healthChecks = builder.Services.AddHealthChecks();
/*#if (UseEFCore && IsLayeredArchitecture) */
    healthChecks.AddDbContextCheck<AppDbContext>();
/*#endif */
/*#if (UseEFCore && (IsCleanArchitecture || IsVerticalSlice)) */
    healthChecks.AddDbContextCheck<MyService.Infrastructure.Persistence.MyServiceDbContext>();
/*#endif */
/*#if (UseRedis) */
    healthChecks.AddRedis(builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379");
/*#endif */
/*#endif */

    // Configure Database
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

/*#if (IsLayeredArchitecture && UseEFCore) */
    builder.Services.AddDbContext<AppDbContext>(options =>
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
/*#endif */

    // Architecture-specific services
/*#if (IsCleanArchitecture) */
    // Clean Architecture Services
    builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
    builder.Services.AddValidatorsFromAssemblyContaining<Program>();
    builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
/*#endif */

/*#if (IsLayeredArchitecture) */
    // Layered Architecture Services
    builder.Services.AddScoped<IWeatherService, WeatherService>();
/*#if (UseEFCore) */
    builder.Services.AddScoped<IWeatherRepository, WeatherRepository>();
/*#endif */
/*#if (UseDapper) */
    builder.Services.AddScoped<IWeatherRepository, WeatherRepositoryDapper>();
/*#endif */
/*#endif */

/*#if (IsVerticalSlice) */
    // Vertical Slice Architecture Services
    builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetWeatherQuery).Assembly));
    builder.Services.AddValidatorsFromAssembly(typeof(CreateWeatherCommand).Assembly);
    builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
/*#endif */

/*#if (IsCleanArchitecture || IsVerticalSlice) */
    // Infrastructure Services
    builder.Services.AddInfrastructureServices(connectionString ?? "");
/*#endif */

/*#if (UseAutoMapper) */
    // AutoMapper
    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
/*#endif */

/*#if (UseMapster) */
    // Mapster
    builder.Services.AddMapster();
/*#endif */

    var app = builder.Build();

    // Configure the HTTP request pipeline
    if (app.Environment.IsDevelopment())
    {
/*#if (UseSwagger) */
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyService API V1");
        });
/*#endif */
    }

    app.UseHttpsRedirection();
    app.UseCors("AllowAll");
    
    app.UseAuthentication();
    app.UseAuthorization();

    // Global Exception Middleware
    app.UseMiddleware<MyService.Api.Middleware.GlobalExceptionMiddleware>();

/*#if (UseMinimalApis) */
    // Minimal API Endpoints
    app.MapGet("/api/weather", async () =>
    {
        return Results.Ok(new[] { new { Date = DateTime.Now, TemperatureC = 25, Summary = "Warm" } });
    });
/*#else */
    app.MapControllers();
/*#endif */

/*#if (UseHealthChecks) */
    app.MapHealthChecks("/health");
    app.MapHealthChecks("/health/ready");
    app.MapHealthChecks("/health/live");
/*#endif */

    app.Run();

/*#if (UseSerilog) */
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
/*#endif */
