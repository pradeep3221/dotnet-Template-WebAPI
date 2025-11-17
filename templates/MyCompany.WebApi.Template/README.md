# 🚀 .NET 9 Web API Template - Configurable Architecture & Stack

A production-ready, enterprise-grade .NET 9 Web API template with **multiple architecture styles** and **fully configurable technology stack**. Choose your architecture, database, ORM, authentication, logging, caching, and testing framework at project creation time.

## ✨ Key Features

### 🏗️ **Three Architecture Styles**
- **Clean Architecture** - Domain-centric with Application, Domain, Infrastructure layers
- **Layered Architecture** - Traditional 4-layer (Api, Business, Data, Domain)
- **Vertical Slice Architecture** - Feature-based organization with MediatR

### ⚙️ **Fully Configurable Stack**
- **Data Access**: Entity Framework Core or Dapper
- **Databases**: SQL Server, PostgreSQL, MySQL, SQLite, or In-Memory
- **Object Mapping**: AutoMapper or Mapster
- **Authentication**: JWT Bearer or OAuth2/OpenID Connect
- **Logging**: Serilog structured logging or built-in .NET logging
- **Caching**: .NET 9 HybridCache, Redis, In-Memory, or None
- **Testing**: xUnit or NUnit with full fixture support
- **API Style**: Controllers or Minimal APIs

### 🎯 **Production-Ready Features**
- **CQRS Pattern** - MediatR with commands, queries, handlers
- **Validation** - FluentValidation with pipeline behaviors
- **API Versioning** - Built-in versioning support
- **Swagger/OpenAPI** - Interactive API documentation
- **Health Checks** - Comprehensive health monitoring
- **Global Exception Handling** - Centralized error middleware
- **Docker Support** - Dockerfile and docker-compose
- **CI/CD** - GitHub Actions workflow included
- **Best Practices** - SOLID principles, modern C# patterns

## 📦 Installation

### Install from NuGet Package

```powershell
dotnet new install MyCompany.CleanArchitecture.Template
```

### Install from Local Directory

```powershell
# Navigate to template directory
cd templates/MyCompany.WebApi.Template

# Install template
dotnet new install .

# Uninstall template
dotnet new uninstall MyCompany.CleanArchitecture.Template

#To reinstall the same version of the template package, use '--force' option:
dotnet new install E:\DotNetWorld\2025Projects\NET-Templates2025 --force
```

### Verify Installation

```powershell
dotnet new list clean-api
```

## 🎯 Usage

### Create a New Project

```powershell
# Basic usage with defaults (Clean Architecture)
dotnet new webapi-advanced -n MyNewApi

# Clean Architecture with EF Core and SQL Server
dotnet new webapi-advanced -n MyApi \
  --Architecture Clean \
  --DataAccess EFCore \
  --DatabaseProvider SqlServer \
  --Mapper AutoMapper \
  --Authentication JWT \
  --Logging Serilog \
  --Caching HybridCache \
  --TestingFramework xUnit

# Layered Architecture with Dapper and PostgreSQL
dotnet new webapi-advanced -n MyApi \
  --Architecture Layered \
  --DataAccess Dapper \
  --DatabaseProvider PostgreSQL \
  --Mapper Mapster \
  --Authentication OAuth2 \
  --Caching Redis

# Vertical Slice with EF Core and Minimal APIs
dotnet new webapi-advanced -n MyApi \
  --Architecture VerticalSlice \
  --DataAccess EFCore \
  --DatabaseProvider SQLite \
  --UseMinimalApis true \
  --TestingFramework NUnit
```

### Template Parameters

| Parameter | Description | Options | Default |
|-----------|-------------|---------|---------|
| `-n, --name` | Name of the project | Any valid name | **Required** |
| `--Architecture` | Architecture style | `Clean`, `Layered`, `VerticalSlice` | `Clean` |
| `--DataAccess` | Data access technology | `EFCore`, `Dapper` | `EFCore` |
| `--DatabaseProvider` | Database provider | `SqlServer`, `PostgreSQL`, `MySQL`, `SQLite`, `InMemory` | `SqlServer` |
| `--Mapper` | Object mapping library | `AutoMapper`, `Mapster` | `AutoMapper` |
| `--Authentication` | Authentication method | `JWT`, `OAuth2` | `JWT` |
| `--Logging` | Logging framework | `Serilog`, `Default` | `Serilog` |
| `--Caching` | Caching strategy | `HybridCache`, `Redis`, `InMemory`, `None` | `HybridCache` |
| `--TestingFramework` | Testing framework | `xUnit`, `NUnit` | `xUnit` |
| `--UseSwagger` | Include Swagger/OpenAPI | `true`, `false` | `true` |
| `--UseHealthChecks` | Include health checks | `true`, `false` | `true` |
| `--UseMinimalApis` | Use Minimal APIs | `true`, `false` | `false` |
| `--IncludeDocker` | Include Docker files | `true`, `false` | `true` |
| `--IncludeGitHubActions` | Include CI/CD workflow | `true`, `false` | `true` |

### View All Options

```powershell
dotnet new clean-api --help
```

## 🏗️ Project Structure

**Note:** The template contains all three architectures. Based on your `--Architecture` choice, only the selected folder is included in your generated project.

### Solution Organization

The template automatically creates a Visual Studio solution file (`.sln`) with proper project organization:
- **All test projects** are grouped in a **`tests` solution folder** for better organization
- Source projects are placed at the solution root level
- When opened in Visual Studio, you'll see a clean structure with tests grouped together

### Clean Architecture
```
MyApi/
├── MyApi.sln                       # Solution file with tests folder
├── src/Clean/
│   ├── Api/                        # Web API layer
│   ├── Application/                # Business logic (CQRS)
│   │   ├── Behaviors/              # MediatR pipeline behaviors
│   │   ├── Features/               # CQRS features
│   │   └── Interfaces/             # Application interfaces
│   ├── Domain/                     # Core domain entities
│   └── Infrastructure/             # Data access, external services
└── tests/                          # Grouped in solution folder
    ├── Fixtures/                   # Test data builders
    ├── IntegrationTests/           # API integration tests
    └── UnitTests/                  # Unit tests (xUnit or NUnit)
```

### Layered Architecture
```
MyApi/
├── src/Layered/
│   ├── Api/                        # Web API controllers
│   ├── Business/                   # Business logic layer
│   │   ├── Interfaces/             # Service contracts
│   │   └── Services/               # Service implementations
│   ├── Data/                       # Data access layer
│   │   ├── Context/                # DbContext (EF) or connection
│   │   ├── Repositories/           # Data repositories
│   │   └── Interfaces/             # Repository contracts
│   └── Domain/                     # Domain entities
└── tests/
```

### Vertical Slice Architecture
```
MyApi/
├── src/VerticalSlice/
│   ├── Api/                        # API entry point
│   ├── Features/                   # Feature slices
│   │   └── Weather/
│   │       ├── GetWeather.cs       # Query + Handler
│   │       ├── ListWeather.cs      # Query + Handler
│   │       └── CreateWeather.cs    # Command + Validator + Handler
│   ├── Shared/                     # Cross-cutting concerns
│   │   ├── Behaviors/              # Pipeline behaviors
│   │   ├── Exceptions/             # Common exceptions
│   │   └── Responses/              # API response models
│   ├── Domain/                     # Domain entities
│   └── Infrastructure/             # Data access, services
└── tests/
```

## 🚀 Getting Started

### 1. Create Project

```powershell
# Install template
dotnet new install .

# Create project with Clean Architecture
dotnet new webapi-advanced -n MyApi --Architecture Clean --DatabaseProvider SqlServer --Authentication JWT
cd MyApi
```

### 2. Update Connection String

Edit `src/Api/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyApiDb;Trusted_Connection=True;"
  }
}
```

### 3. Run Migrations (if using EF Core)

For Clean Architecture:
```powershell
cd src/Clean/Infrastructure
dotnet ef migrations add InitialCreate -s ../Api
dotnet ef database update -s ../Api
```

For Layered Architecture:
```powershell
cd src/Layered/Data
dotnet ef migrations add InitialCreate -s ../Api
dotnet ef database update -s ../Api
```

For Vertical Slice:
```powershell
cd src/VerticalSlice/Infrastructure
dotnet ef migrations add InitialCreate -s ../Api
dotnet ef database update -s ../Api
```

### 4. Build and Run

For Clean Architecture:
```powershell
cd src/Clean/Api
dotnet run
```

For Layered Architecture:
```powershell
cd src/Layered/Api
dotnet run
```

For Vertical Slice:
```powershell
cd src/VerticalSlice/Api
dotnet run
```

### 5. Access Swagger

Navigate to: `https://localhost:5001/swagger`

## 🧪 Running Tests

```powershell
# Run all tests
dotnet test

# Run with coverage
dotnet test /p:CollectCoverage=true

# Run specific test project
dotnet test tests/UnitTests/MyService.UnitTests.csproj
```

## 🐳 Docker Support

### Build and Run with Docker

```powershell
# Build image
docker build -t myapi:latest .

# Run container
docker run -p 5000:8080 myapi:latest
```

### Using Docker Compose

```powershell
docker-compose up -d
```

## 📝 Development

### Adding a New Feature

1. **Create Domain Entity** (`src/Domain/Entities/Product.cs`)
2. **Create Commands/Queries** (`src/Application/Features/Products/`)
3. **Create Handlers** (`src/Application/Features/Products/Handlers/`)
4. **Create Validators** (`src/Application/Features/Products/Validators/`)
5. **Create Repository** (`src/Infrastructure/Repositories/ProductRepository.cs`)
6. **Create Controller** (`src/Api/Controllers/ProductsController.cs`)
7. **Add Tests** (`tests/UnitTests/` and `tests/IntegrationTests/`)

### Example: Adding New Entity

```csharp
// 1. Domain Entity
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

// 2. Command
public record CreateProductCommand(string Name, decimal Price) : IRequest<Product>;

// 3. Handler
public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Product>
{
    // Implementation
}

// 4. Controller
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;
    
    [HttpPost]
    public async Task<ActionResult<Product>> Create(CreateProductCommand command)
    {
        return await _mediator.Send(command);
    }
}
```

## 🔧 Configuration

### Architecture-Specific Setup

#### Clean Architecture
- MediatR automatically registers all handlers
- FluentValidation pipeline behavior validates commands/queries
- Repository pattern in Infrastructure layer

#### Layered Architecture
- Service layer in Business project
- Repository pattern in Data layer
- Direct service injection in API controllers

#### Vertical Slice
- Each feature is self-contained (command/query + handler + validator)
- Shared behaviors for cross-cutting concerns
- Feature-specific repository interfaces

### Authentication Configuration

#### JWT Authentication
Configure in `appsettings.json`:
```json
{
  "JwtSettings": {
    "Secret": "YourSecretKey_AtLeast32Characters",
    "Issuer": "MyService",
    "Audience": "MyServiceApi",
    "ExpirationInMinutes": 60
  }
}
```

#### OAuth2/OpenID Connect
Configure in `appsettings.json`:
```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "your-tenant-id",
    "ClientId": "your-client-id",
    "ClientSecret": "your-client-secret"
  }
}
```

### Caching Configuration

#### HybridCache (.NET 9)
```csharp
builder.Services.AddHybridCache(options => {
    options.DefaultEntryOptions = new() {
        Expiration = TimeSpan.FromMinutes(5),
        LocalCacheExpiration = TimeSpan.FromMinutes(5)
    };
});
```

#### Redis
Set connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "Redis": "localhost:6379"
  }
}
```

### Logging with Serilog

Serilog is pre-configured to write to:
- **Console** - Structured console output
- **File** - Rolling daily log files in `logs/` directory

Customize in `appsettings.json`:
```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning"
      }
    }
  }
}
```

### Health Checks

Access health endpoints:
- `/health` - Overall health status
- `/health/ready` - Readiness probe (Kubernetes)
- `/health/live` - Liveness probe (Kubernetes)

Includes checks for:
- Database connectivity (EF Core)
- Redis availability (if configured)

### API Versioning

```csharp
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class WeatherController : ControllerBase
```

## 📚 Technologies & Packages

### Core Framework
- **.NET 9** - Latest .NET framework
- **C# 13** - Modern C# features
- **ASP.NET Core 9** - Web framework

### Data Access
- **Entity Framework Core 9** - Full ORM with migrations *(configurable)*
- **Dapper 2.1** - Lightweight micro-ORM *(configurable)*

### Database Providers *(configurable)*
- **SQL Server** - Microsoft.EntityFrameworkCore.SqlServer
- **PostgreSQL** - Npgsql.EntityFrameworkCore.PostgreSQL
- **MySQL** - Pomelo.EntityFrameworkCore.MySql
- **SQLite** - Microsoft.EntityFrameworkCore.Sqlite

### Architecture & Patterns
- **MediatR 12** - CQRS/Mediator pattern
- **FluentValidation 11** - Validation rules

### Object Mapping *(configurable)*
- **AutoMapper 13** - Profile-based mapping
- **Mapster 7** - Code-first lightweight mapper

### Authentication *(configurable)*
- **JWT Bearer** - Token-based authentication
- **OAuth2/OpenID Connect** - Microsoft Identity Web

### Logging *(configurable)*
- **Serilog** - Structured logging with Console & File sinks
- **Built-in .NET Logging** - Default logging

### Caching *(configurable)*
- **.NET 9 HybridCache** - Distributed + in-memory caching
- **Redis** - StackExchange.Redis
- **In-Memory** - Built-in memory cache

### API Documentation
- **Swashbuckle 6** - Swagger/OpenAPI generation

### Testing *(configurable)*
- **xUnit** or **NUnit** - Testing frameworks
- **FluentAssertions** - Fluent test assertions
- **Moq** - Mocking framework
- **WebApplicationFactory** - Integration testing

### DevOps
- **Docker** - Containerization support
- **GitHub Actions** - CI/CD workflow

## 📦 NuGet Packages

Key packages included:
- Microsoft.AspNetCore.OpenApi
- Swashbuckle.AspNetCore
- Microsoft.EntityFrameworkCore
- MediatR
- FluentValidation
- AutoMapper / Mapster
- Microsoft.AspNetCore.Authentication.JwtBearer

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🎓 Resources

- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [.NET Template Documentation](https://learn.microsoft.com/en-us/dotnet/core/tools/custom-templates)
- [MediatR Documentation](https://github.com/jbogard/MediatR)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)

## 🔍 Architecture Comparison

| Aspect | Clean Architecture | Layered Architecture | Vertical Slice |
|--------|-------------------|---------------------|----------------|
| **Complexity** | High | Medium | Low-Medium |
| **Learning Curve** | Steep | Moderate | Gentle |
| **Best For** | Large enterprise apps | Medium-sized projects | Microservices, feature-focused |
| **Testability** | Excellent | Good | Excellent |
| **Maintenance** | Structured | Traditional | Feature-isolated |
| **Team Size** | Large teams | Small-Medium teams | Any size |
| **CQRS** | Built-in | Optional | Built-in |
| **Dependencies** | MediatR, many layers | Traditional services | MediatR, minimal |

## 🎯 When to Use What?

### Choose **Clean Architecture** when:
- Building large, complex enterprise applications
- Need strict separation of concerns
- Multiple teams working on different layers
- Long-term maintainability is critical
- Domain logic is complex

### Choose **Layered Architecture** when:
- Building traditional CRUD applications
- Team is familiar with classic n-tier design
- Simpler project with moderate complexity
- Don't need CQRS pattern
- Quick setup is priority

### Choose **Vertical Slice** when:
- Building microservices
- Feature-based development workflow
- Want to minimize cross-cutting changes
- Each feature is relatively independent
- Team prefers co-located code

## 🔄 Data Access: EF Core vs Dapper

| Feature | Entity Framework Core | Dapper |
|---------|----------------------|--------|
| **Performance** | Good | Excellent |
| **Complexity** | Higher | Lower |
| **Migrations** | Built-in | Manual |
| **Change Tracking** | Automatic | Manual |
| **LINQ Support** | Full | Limited |
| **Raw SQL** | Supported | Primary |
| **Learning Curve** | Steeper | Gentler |
| **Best For** | Complex domains, relationships | High-performance queries |

## 🗺️ Object Mapping: AutoMapper vs Mapster

| Feature | AutoMapper | Mapster |
|---------|-----------|---------|
| **Performance** | Good | Excellent |
| **Configuration** | Profile-based | Code-first |
| **Conventions** | Rich | Simple |
| **Learning Curve** | Moderate | Easy |
| **Ecosystem** | Mature | Growing |
| **Best For** | Complex mappings | Simple, fast mappings |

## 🆘 Troubleshooting

### Template Not Found

```powershell
# Uninstall and reinstall
dotnet new uninstall MyCompany.CleanArchitecture.Template
dotnet new install .
```

### Build Errors

```powershell
# Clean and restore
dotnet clean
dotnet restore
dotnet build
```

### Template Syntax Errors
The template uses conditional compilation directives (`#if`, `#elif`, `#endif`). These are normal and will be resolved when you create a project from the template.

### Database Connection Issues

- Verify connection string in `appsettings.json`
- Ensure database server is running
- Check firewall settings
- For EF Core, run migrations: `dotnet ef database update`

### Redis Connection Issues
- Ensure Redis server is running
- Check connection string in `appsettings.json`
- For Docker: `docker run -d -p 6379:6379 redis:latest`

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check documentation
- Review example projects

---

## Todo
- New Virticle slice with CQRS with EF Core as write and Dapper as read and Event Sourcing with KurrentDB
- Messaging with MassTransit with RabbitMQ, Auzure Service Bus, AWS SQS Kafka. 
- Add simple 3 layer template - API, Business, Data
- Worker Service Template with Clean Architecture, scaffold background processing services — queue consumers, schedulers, or data sync jobs. you can publish it as a .nupkg
At template consume time, prompt for:
   | Option                | Choices                              |
| --------------------- | ------------------------------------ |
| **Queue Type**        | RabbitMQ / Kafka / SQS / Azure Queue |
| **Scheduler Type**    | Cron / Timed Loop                    |
| **Logging Framework** | Serilog / NLog                       |
| **ORM / Database**    | EF Core / Dapper / None              |


**Made with ❤️ using .NET 9**



# *Automatically generating code snippets from Endpoint to Persistence.

## Recommended Workflow
For New Features (Full CRUD):
```
1. Use AI Toolkit Agent → Generate complete feature
2. Review & adjust generated code
3. Run tests
```

For Single Operations:
```
1. Type snippet prefix (vs-command, vs-query)
2. Fill in placeholders
3. Add business logic
```

For Team Standards:
```
1. Create dotnet templates for common patterns
2. Team uses: dotnet new vs-feature -n [Name]
```

## Differnet Approches 

### 1. ***AI Toolkit Tools
For agent-driven code generation, consider:

- Use aitk-get_agent_code_gen_best_practices for guidance
- Create an agent that understands your architecture
- Generate entire features with proper error handling

Best Approach: Hybrid Strategy - Why Best:
- ✅ Understands your entire architecture context
- ✅ Generates complete features (Endpoint → Handler → Validation → Repository → Tests)
- ✅ Follows your conventions automatically
- ✅ Handles complex scenarios with proper error handling
- ✅ Can read existing code patterns and replicate them

Usage:
```
Create a new Product management feature with:
- CreateProduct command (POST /api/products)
- GetProduct query (GET /api/products/{id})
- UpdateProduct command (PUT /api/products/{id})
- DeleteProduct command (DELETE /api/products/{id})
- Include FluentValidation, error handling, and repository pattern
```


### 2. VS Code Snippets (Built-in) - Second best
Create custom snippets in .vscode/snippets.code-snippets:
```json
{
  "Vertical Slice Feature": {
    "prefix": "vs-feature",
    "body": [
      "// Features/${1:FeatureName}/",
      "public record ${1}Command : IRequest<Result<${1}Response>>;",
      "",
      "public class ${1}Handler : IRequestHandler<${1}Command, Result<${1}Response>>",
      "{",
      "    private readonly IRepository<${2:Entity}> _repository;",
      "    ",
      "    public ${1}Handler(IRepository<${2}> repository)",
      "    {",
      "        _repository = repository;",
      "    }",
      "    ",
      "    public async Task<Result<${1}Response>> Handle(${1}Command request, CancellationToken ct)",
      "    {",
      "        $0",
      "    }",
      "}",
      "",
      "public record ${1}Response;"
    ]
  }
}
```
For rapid scaffolding of individual components:

```json
// .vscode/vertical-slice.code-snippets
{
  "VS Command+Handler": {
    "prefix": "vs-command",
    "scope": "csharp",
    "body": [
      "namespace ${1:FeatureName};",
      "",
      "public record ${2:Create}${1}Command(",
      "    ${3:string Name}",
      ") : IRequest<Result<${1}Response>>;",
      "",
      "public class ${2}${1}Handler : IRequestHandler<${2}${1}Command, Result<${1}Response>>",
      "{",
      "    private readonly IApplicationDbContext _context;",
      "    private readonly IMapper _mapper;",
      "",
      "    public ${2}${1}Handler(IApplicationDbContext context, IMapper mapper)",
      "    {",
      "        _context = context;",
      "        _mapper = mapper;",
      "    }",
      "",
      "    public async Task<Result<${1}Response>> Handle(${2}${1}Command request, CancellationToken ct)",
      "    {",
      "        ${0:// TODO: Implementation}",
      "    }",
      "}",
      "",
      "public record ${1}Response;",
      "",
      "public class ${2}${1}Validator : AbstractValidator<${2}${1}Command>",
      "{",
      "    public ${2}${1}Validator()",
      "    {",
      "        // TODO: Add validation rules",
      "    }",
      "}"
    ]
  },
  "VS Query+Handler": {
    "prefix": "vs-query",
    "scope": "csharp",
    "body": [
      "namespace ${1:FeatureName};",
      "",
      "public record Get${1}Query(${2:int Id}) : IRequest<Result<${1}Response>>;",
      "",
      "public class Get${1}Handler : IRequestHandler<Get${1}Query, Result<${1}Response>>",
      "{",
      "    private readonly IApplicationDbContext _context;",
      "    private readonly IMapper _mapper;",
      "",
      "    public Get${1}Handler(IApplicationDbContext context, IMapper mapper)",
      "    {",
      "        _context = context;",
      "        _mapper = mapper;",
      "    }",
      "",
      "    public async Task<Result<${1}Response>> Handle(Get${1}Query request, CancellationToken ct)",
      "    {",
      "        ${0:// TODO: Implementation}",
      "    }",
      "}",
      "",
      "public record ${1}Response;"
    ]
  },
  "VS Minimal API Endpoint": {
    "prefix": "vs-endpoint",
    "scope": "csharp",
    "body": [
      "app.MapPost(\"/api/${1:resource}\", async (",
      "    [FromBody] ${2:Create}${3:Entity}Command command,",
      "    IMediator mediator,",
      "    CancellationToken ct) =>",
      "{",
      "    var result = await mediator.Send(command, ct);",
      "    return result.IsSuccess ",
      "        ? Results.Created($\"/api/${1}/{result.Value.Id}\", result.Value)",
      "        : Results.BadRequest(result.Error);",
      "})",
      ".WithName(\"${2}${3}\")",
      ".WithTags(\"${3}\")",
      ".Produces<${3}Response>(StatusCodes.Status201Created)",
      ".ProducesProblem(StatusCodes.Status400BadRequest);",
      "",
      "${0}"
    ]
  }
}
```

### 3. dotnet CLI Templates
Create item templates:
```
dotnet new install MyCompany.VerticalSlice.Templates
dotnet new vs-command -n CreateProduct
```
Create item templates for team consistency:
```
# Create template structure
dotnet new install MyCompany.VerticalSlice.Templates

# Generate feature
dotnet new vs-feature -n Product -o src/VerticalSlice/Features/Products
```

---
Avoid These:
❌ Roslyn Source Generators - Overkill for Vertical Slice, compile-time complexity
❌ T4 Templates - Legacy, hard to maintain
❌ GitHub Copilot /new - Good but less architecture-aware than AI Toolkit agent
---

### 4. Roslyn Source Generators
Create a compile-time generator:
- Generate boilerplate for Commands/Queries
- Auto-generate Endpoints from markers
- Create Repository patterns

###  5. T4 Templates / Scriban
Runtime text templates for:
- CRUD operations
- Feature scaffolding
- Entity-to-DTO mapping


### 6. GitHub Copilot Chat Participants (Recommended)
Use /new slash command with context:
```
/new feature for managing products with create, update, delete endpoints
```



