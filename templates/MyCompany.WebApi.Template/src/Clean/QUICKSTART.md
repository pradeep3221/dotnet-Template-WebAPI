# Clean Architecture QuickStart

## Local Development
```
# Restore & build
./create-solution.ps1
 dotnet build

# Run API
cd src/Clean/Api
dotnet run
```

## Docker
```
# Build and run containers (API + SQL Server)
docker compose -f src/Clean/docker-compose.yml up --build
```

## Tests
```
dotnet test tests/UnitTests
dotnet test tests/IntegrationTests
```

## Common Environment Variables
| Name | Purpose |
|------|---------|
| ASPNETCORE_ENVIRONMENT | Set environment (Development, Staging, Production) |
| ConnectionStrings__DefaultConnection | Override default DB connection string |

## Health & Swagger
- Swagger: http://localhost:8080/swagger
- Health:  http://localhost:8080/health
