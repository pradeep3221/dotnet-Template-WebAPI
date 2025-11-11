/*#if (IsLayeredArchitecture && UseDapper) */
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MyService.Data.Interfaces;
using MyService.Domain.Entities;

namespace MyService.Data.Repositories;

public class WeatherRepositoryDapper : IWeatherRepository
{
    private readonly string _connectionString;

    public WeatherRepositoryDapper(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Connection string not found");
    }

    public async Task<IEnumerable<WeatherForecast>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = "SELECT * FROM WeatherForecasts ORDER BY Date DESC";
        return await connection.QueryAsync<WeatherForecast>(sql);
    }

    public async Task<WeatherForecast?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = "SELECT * FROM WeatherForecasts WHERE Id = @Id";
        return await connection.QueryFirstOrDefaultAsync<WeatherForecast>(sql, new { Id = id });
    }

    public async Task<WeatherForecast> AddAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = @"INSERT INTO WeatherForecasts (Date, TemperatureC, Summary, CreatedAt) 
                   VALUES (@Date, @TemperatureC, @Summary, @CreatedAt);
                   SELECT CAST(SCOPE_IDENTITY() as int)";
        forecast.Id = await connection.ExecuteScalarAsync<int>(sql, forecast);
        return forecast;
    }

    public async Task UpdateAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        using var connection = new SqlConnection(_connectionString);
        forecast.UpdatedAt = DateTime.UtcNow;
        var sql = @"UPDATE WeatherForecasts 
                   SET Date = @Date, TemperatureC = @TemperatureC, 
                       Summary = @Summary, UpdatedAt = @UpdatedAt 
                   WHERE Id = @Id";
        await connection.ExecuteAsync(sql, forecast);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = "DELETE FROM WeatherForecasts WHERE Id = @Id";
        await connection.ExecuteAsync(sql, new { Id = id });
    }
}
/*#endif */
