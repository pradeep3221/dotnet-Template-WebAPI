# 🚀 Quick Reference Guide

## Template Installation

```powershell
# Install from local directory
cd templates/MyCompany.WebApi.Template
dotnet new install .

# Uninstall
dotnet new uninstall MyCompany.CleanArchitecture.Template

# List installed templates
dotnet new list webapi-advanced
```

## Quick Start Examples

### 1. Clean Architecture + EF Core + SQL Server + JWT
```powershell
dotnet new webapi-advanced -n MyApi \
  --Architecture Clean \
  --DataAccess EFCore \
  --DatabaseProvider SqlServer \
  --Authentication JWT \
  --Logging Serilog \
  --Caching HybridCache
```

### 2. Layered + Dapper + PostgreSQL + OAuth2
```powershell
dotnet new webapi-advanced -n MyApi \
  --Architecture Layered \
  --DataAccess Dapper \
  --DatabaseProvider PostgreSQL \
  --Authentication OAuth2 \
  --Caching Redis
```

### 3. Vertical Slice + EF Core + SQLite + Minimal APIs
```powershell
dotnet new webapi-advanced -n MyApi \
  --Architecture VerticalSlice \
  --DataAccess EFCore \
  --DatabaseProvider SQLite \
  --UseMinimalApis true \
  --TestingFramework NUnit
```

### 4. Production-Ready Setup
```powershell
dotnet new webapi-advanced -n ProductionApi \
  --Architecture Clean \
  --DataAccess EFCore \
  --DatabaseProvider SqlServer \
  --Mapper AutoMapper \
  --Authentication JWT \
  --Logging Serilog \
  --Caching HybridCache \
  --UseSwagger true \
  --UseHealthChecks true \
  --IncludeDocker true \
  --IncludeGitHubActions true \
  --TestingFramework xUnit
```

## Post-Creation Steps

### 1. Build Solution
```powershell
cd MyApi
dotnet restore
dotnet build
```

### 2. Run Migrations (EF Core only)
```powershell
cd src/Infrastructure  # or src/Data for Layered
dotnet ef migrations add InitialCreate -s ../Api
dotnet ef database update -s ../Api
```

### 3. Run Application
```powershell
cd src/Api
dotnet run
```

### 4. Run Tests
```powershell
dotnet test
```

### 5. Docker Build & Run
```powershell
docker build -t myapi:latest .
docker-compose up -d
```

## Configuration Cheat Sheet

### Connection Strings

**SQL Server:**
```json
"Server=(localdb)\\mssqllocaldb;Database=MyDb;Trusted_Connection=True;"
```

**PostgreSQL:**
```json
"Host=localhost;Port=5432;Database=MyDb;Username=postgres;Password=pass;"
```

**MySQL:**
```json
"Server=localhost;Port=3306;Database=MyDb;User=root;Password=pass;"
```

**SQLite:**
```json
"Data Source=MyDb.db"
```

### JWT Configuration
```json
{
  "JwtSettings": {
    "Secret": "Your32CharacterOrLongerSecretKey!",
    "Issuer": "MyApi",
    "Audience": "MyApiUsers",
    "ExpirationInMinutes": 60
  }
}
```

### Redis Configuration
```json
{
  "ConnectionStrings": {
    "Redis": "localhost:6379"
  }
}
```

## Common Commands

### EF Core Migrations
```powershell
# Add migration
dotnet ef migrations add MigrationName -s ../Api

# Update database
dotnet ef database update -s ../Api

# Remove last migration
dotnet ef migrations remove -s ../Api

# List migrations
dotnet ef migrations list -s ../Api
```

### Testing
```powershell
# Run all tests
dotnet test

# Run with coverage
dotnet test /p:CollectCoverage=true

# Run specific project
dotnet test tests/UnitTests/MyService.UnitTests.csproj

# Run tests with filter
dotnet test --filter "Category=Unit"
```

### Docker
```powershell
# Build image
docker build -t myapi:latest .

# Run container
docker run -d -p 8080:8080 --name myapi myapi:latest

# View logs
docker logs myapi

# Stop and remove
docker stop myapi && docker rm myapi

# Compose up
docker-compose up -d

# Compose down
docker-compose down
```

## Architecture-Specific Patterns

### Clean Architecture - Adding New Feature

1. **Create Entity** in `Domain/Entities/Product.cs`
2. **Create Command** in `Application/Features/Products/Commands/CreateProductCommand.cs`
3. **Create Handler** in `Application/Features/Products/Handlers/CreateProductCommandHandler.cs`
4. **Create Validator** in `Application/Features/Products/Validators/CreateProductCommandValidator.cs`
5. **Create Repository Interface** in `Application/Interfaces/IProductRepository.cs`
6. **Implement Repository** in `Infrastructure/Repositories/ProductRepository.cs`
7. **Create Controller** in `Api/Controllers/ProductsController.cs`
8. **Add Tests** in `tests/UnitTests/` and `tests/IntegrationTests/`

### Layered Architecture - Adding New Feature

1. **Create Entity** in `Domain/Entities/Product.cs`
2. **Create Repository Interface** in `Data/Interfaces/IProductRepository.cs`
3. **Implement Repository** in `Data/Repositories/ProductRepository.cs`
4. **Create Service Interface** in `Business/Interfaces/IProductService.cs`
5. **Implement Service** in `Business/Services/ProductService.cs`
6. **Create Controller** in `Api/Controllers/ProductsController.cs`
7. **Add Tests**

### Vertical Slice - Adding New Feature

1. **Create Entity** in `Domain/Entities/Product.cs`
2. **Create Feature File** in `Features/Products/CreateProduct.cs` with:
   - Command record
   - Validator class
   - Handler class
   - Repository interface
3. **Implement Repository** in `Infrastructure/Repositories/`
4. **Add to Controller or Minimal API**
5. **Add Tests**

## Troubleshooting Quick Fixes

### Template Not Working
```powershell
dotnet new uninstall MyCompany.CleanArchitecture.Template
dotnet new install .
dotnet new list webapi-advanced
```

### Build Errors
```powershell
dotnet clean
rm -rf bin obj
dotnet restore
dotnet build
```

### Database Issues
```powershell
# Drop and recreate
dotnet ef database drop -s ../Api
dotnet ef database update -s ../Api
```

### Port Already in Use
Edit `launchSettings.json` or:
```powershell
dotnet run --urls "https://localhost:5001;http://localhost:5000"
```

## URLs

- **Swagger**: `https://localhost:5001/swagger`
- **Health**: `https://localhost:5001/health`
- **API Base**: `https://localhost:5001/api/`

## Environment Variables

Set in `launchSettings.json` or command line:

```json
{
  "ASPNETCORE_ENVIRONMENT": "Development",
  "ConnectionStrings__DefaultConnection": "your-connection-string",
  "JwtSettings__Secret": "your-jwt-secret"
}
```

## Useful NuGet Commands

```powershell
# List outdated packages
dotnet list package --outdated

# Update package
dotnet add package PackageName --version 1.0.0

# Remove package
dotnet remove package PackageName
```

---

**Need more help?** Check the full [README.md](README.md) for detailed documentation.
