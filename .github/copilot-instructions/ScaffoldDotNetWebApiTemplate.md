# 🚀 .NET 9 Web API Template Scaffold Prompt (Configurable Architecture & Tech Stack)

## 📋 Overview

This prompt instructs **GitHub Copilot** to scaffold a **configurable .NET 9 Web API project template**.  
It supports multiple architectural styles, data access options, mapping libraries, and authentication mechanisms.  
It's designed to serve as a **future-proof, reusable baseline** for enterprise-grade APIs.

### Distribution Options
- NuGet package
- .NET Core project template
- GitHub template
- Cookiecutter template

### References
- [Tutorial: Create a project template](https://learn.microsoft.com/en-us/dotnet/core/tutorials/cli-templates-create-project-template)
- [dotnet/templating](https://github.com/dotnet/templating)
- [ardalis/CleanArchitecture](https://github.com/ardalis/CleanArchitecture)
- [Implement background tasks in microservices with IHostedService and the BackgroundService class](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/background-tasks-with-ihostedservice)

---

## 🎯 Goals

Generate a **.NET 9 Web API solution** with:
- **Configurable architecture style** (Clean, Layered, or Vertical Slice)
- **Configurable technology stack** (ORM, database, mapper, auth, caching)
- **Full testing setup with fixtures** (unit, integration, builders)
- **Production-ready patterns** (logging, validation, DI, health checks, exception handling)

---

## 🧱 Architecture Options

At project creation, **ask the user to choose one** of the following architecture styles:

```
MyCompany.dotnet.Template/
│
├── .template.config/
│   └── template.json
│ 
├── src/
│   ├── Layered/
│   ├── Clean/
│   └── VerticalSlice/

With test in each folder
tests/
    ├── UnitTests/
    │   ├── Application/
    │   │   └── GetWeatherQueryHandlerTests.cs
    │   ├── Domain/
    │   │   └── WeatherForecastTests.cs
    │   └── MyService.UnitTests.csproj
    │
    ├── IntegrationTests/
    │   ├── Api/
    │   │   └── WeatherControllerTests.cs
    │   ├── Infrastructure/
    │   │   └── RepositoryTests.cs
    │   └── MyService.IntegrationTests.csproj
    │
    └── Fixtures/
        ├── TestData/
        │   └── WeatherSample.json
        ├── Builders/
        │   └── WeatherForecastBuilder.cs
        └── MyService.Fixtures.csproj

```

### 1. **Layered Architecture**

**Best for:** Small to medium projects, internal services, traditional line-of-business applications

**Structure:**
```
/src/Layered/
  /Api
  /Business
  /Data
  /Domain
/tests/
  /UnitTests
  /IntegrationTests
  /Fixtures
```

**Characteristics:**
- Straightforward 3-4 layer structure
- Clear separation of concerns
- Ideal for small to medium and internal services
- Easier to maintain, fewer abstractions than Clean Architecture

🧩 Example Folder Contents for simple layered
```
/src/Layered/
 ├── Api/
 │    ├── Controllers/
 │    │    └── UsersController.cs
 │    ├── DTOs/
 │    └── Middleware/
 │
 ├── Business/
 │    ├── Interfaces/
 │    ├── Services/
 │    │    └── UserService.cs
 │
 ├── Data/
 │    ├── Context/
 │    │    └── AppDbContext.cs
 │    ├── Repositories/
 │    │    └── UserRepository.cs
 │
 ├── Domain/
 │    ├── Entities/
 │    │    └── User.cs
 │    └── Enums/
 │
/tests
 ├── UnitTests/
 ├── IntegrationTests/
 └── Fixtures/

```

### 2. **Clean Architecture** (Hexagonal Architecture)

**Best for:** Large enterprise applications, long-term projects, complex business domains

**Structure:**
```
/src/Clean/
  /Api
  /Application
  /Domain
  /Infrastructure
/tests/
  /UnitTests
  /IntegrationTests
  /Fixtures
```

**Characteristics:**
- Core domain isolated from external dependencies
- High testability and scalability
- Supports DDD patterns and CQRS with MediatR
- Dependency rule: inner layers don't depend on outer layers

🧩 Example Folder Contents for Clean Architecture
```
src/Clean
├── Api/
│   ├── Controllers/
│   │   └── WeatherForecastController.cs
│   ├── Extensions/
│   │   ├── DependencyInjection.cs
│   │   ├── ConfigureSwagger.cs
│   │   └── ConfigureAuth.cs
│   ├── Program.cs
│   └── MyService.Api.csproj
│
├── Application/
│   ├── Interfaces/
│   │   └── IWeatherService.cs
│   ├── Features/
│   │   ├── Weather/
│   │   │   ├── Commands/
│   │   │   │   └── UpdateWeatherCommand.cs
│   │   │   ├── Queries/
│   │   │   │   └── GetWeatherQuery.cs
│   │   │   └── Handlers/
│   │   │       └── GetWeatherQueryHandler.cs
│   ├── Behaviors/
│   │   └── ValidationBehavior.cs
│   └── MyService.Application.csproj
│
├── Domain/
│   ├── Entities/
│   │   └── WeatherForecast.cs
│   ├── Events/
│   │   └── WeatherUpdatedEvent.cs
│   ├── Exceptions/
│   │   └── InvalidTemperatureException.cs
│   └── MyService.Domain.csproj
│
├── Infrastructure/
│   ├── Persistence/
│   │   ├── MyServiceDbContext.cs
│   │   ├── Configurations/
│   │   │   └── WeatherConfiguration.cs
│   │   └── Repositories/
│   │       └── WeatherRepository.cs
│   ├── Services/
│   │   └── WeatherService.cs
│   ├── Mappings/
│   │   └── MappingProfile.cs
│   ├── Extensions/
│   │   └── InfrastructureServiceRegistration.cs
│   └── MyService.Infrastructure.csproj


```

### 3. **Vertical Slice Architecture**

**Best for:** Microservices, feature-focused teams, modular monoliths

**Structure:**
```
/src/VerticalSlice/
  /Api
  /Features
      /Weather
          GetWeather.cs
          CreateWeather.cs
      /Users
          CreateUser.cs
          GetUser.cs
  /Infrastructure
  /Domain
  /Shared
/tests/
  /UnitTests
  /IntegrationTests
  /Fixtures
```

**Characteristics:**
- Each feature is self-contained with all layers
- Minimal coupling between features
- Uses MediatR + CQRS patterns
- Great for microservices or modular domains
- Easier to work on features in parallel

---

🧩 Example Folder Contents for CQRS + Vertical Slice
```
 src/VerticalSlice
 ├── Api/
 │   ├── Program.cs
 │   └── MyService.Api.csproj
 │
 ├── Features/
 │   ├── Users/
 │   │   ├── UsersController.cs
 │   │   ├── CreateUser.cs
 │   │   └── GetUser.cs
 │   │
 │   ├── Products/
 │   │   ├── ProductsController.cs
 │   │   ├── AddProduct.cs
 │   │   └── ListProducts.cs
 │
 ├── Infrastructure/
 │   ├── Persistence/
 │   │   ├── AppDbContext.cs
 │   │   └── Repository.cs
 │   ├── Services/
 │   │   └── EmailService.cs
 │   └── MyService.Infrastructure.csproj
 │
 ├── Domain/
 │   ├── Entities/
 │   │   ├── User.cs
 │   │   └── Product.cs
 │   ├── Events/
 │   │   └── ProductAddedEvent.cs
 │   └── MyService.Domain.csproj
 │
 ├── Shared/
 │   ├── Behaviors/
 │   │   └── ValidationBehavior.cs
 │   ├── Exceptions/
 │   │   └── NotFoundException.cs
 │   ├── Responses/
 │   │   └── ApiResponse.cs
 │   ├── Extensions/
 │   │   └── DependencyInjection.cs
 │   └── MyService.Shared.csproj


```
---
## ⚙️ Key Highlights
| Area                     | Purpose                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **.template.config/**    | Contains `template.json` which defines the `dotnet new` parameters (architecture, ORM, auth). |
| **/src/Clean/**          |              Example of Clean Architecture folder structure.                                  |
| **/src/VerticalSlice/**  |              Example of Vertical Slice Architecture folder structure.                         |
| **/src/Layered/**        |              Example of Layered Architecture folder structure.                                |

### Sample for Vertical Slice /src/Layered/
| Area                     | Purpose                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **/Api/**            | Entry point — hosts API setup, middleware, dependency injection, and Swagger.                 |
| **/Features/**       | Each feature is a *vertical slice* — controller + command + query in one place.               |
| **/Application/**    | Encapsulates CQRS handlers, service abstractions, and domain contracts (Clean Architecture).  |
| **/Business/**       | Houses service-layer logic (for Layered Architecture mode).                                   |
| **/Infrastructure/** | Implements database, caching, external APIs, email, logging, etc.                             |
| **/Shared/**         | Cross-cutting concerns — validation, middleware, exceptions, helpers.                         |
| **/Domain/**         | Core business entities, value objects, and domain events (no dependencies).                   |
| **/tests/**              | Organized testing setup — includes **Fixtures**, **UnitTests**, and **IntegrationTests**.     |

---

## ⚙️ Configuration Options

At template instantiation time, **prompt the developer to choose**:

### 🧩 Data Access
| Option | Description | Use Case |
|--------|-------------|----------|
| **Entity Framework Core** | Full ORM with migrations and repository pattern | Complex queries, relationships, rapid development |
| **Dapper** | Lightweight micro-ORM with manual SQL | High-performance, simple queries, fine-grained control |

### 💾 Database Provider
| Option | Description | Use Case |
|--------|-------------|----------|
| **SQL Server** | Microsoft SQL Server | Enterprise, Windows environments |
| **PostgreSQL** | Open-source, ACID-compliant | Cloud-native, cross-platform |
| **MySQL** | Popular open-source RDBMS | Web applications, LAMP stack |
| **SQLite** | Embedded, file-based | Development, testing, small apps |
| **InMemory** | In-memory database | Testing, prototyping |

### 🗺️ Object Mapping
| Option | Description | Performance |
|--------|-------------|-------------|
| **AutoMapper** | Profile-based, convention-driven mapping | Good |
| **Mapster** | Lightweight, code-first mapper with minimal config | Excellent |

### 🔐 Authentication
| Option | Description | Use Case |
|--------|-------------|----------|
| **JWT** | Stateless token-based authentication | API authentication, mobile apps |
| **OAuth2 / OpenID Connect** | Via Azure AD or IdentityServer | Enterprise SSO, social login |

### 💾 Caching Strategy
| Option | Description | Use Case |
|--------|-------------|----------|
| **HybridCache** | .NET 9 L1+L2 cache | High-performance, automatic serialization |
| **Redis** | Distributed cache | Multi-instance, session storage |
| **InMemory** | In-process cache | Single-instance, development |

### 🧪 Testing Framework
| Option | Description |
|--------|-------------|
| **xUnit** | Modern, extensible testing framework |
| **NUnit** | Traditional, attribute-based testing |

### ✅ Always Included
- **FluentValidation** - Input validation
- **Serilog** - Structured logging
- **Swagger** - API documentation

---

## 📦 Template Usage

### Installation
```powershell
# Install template locally
dotnet new install .

# Install from NuGet (future)
dotnet new install MyCompany.WebApi.Template

# Verify installation
dotnet new list webapi-advanced
```

### Create New Project
```powershell
# Interactive mode (prompts for each option)
dotnet new webapi-advanced -n MyApiProject

# Non-interactive mode with all parameters
dotnet new webapi-advanced -n MyApiProject \
  --Architecture Clean \
  --DataAccess EFCore \
  --DatabaseProvider SqlServer \
  --Mapper AutoMapper \
  --Authentication JWT \
  --TestingFramework xUnit \
  --Caching HybridCache \
  --UseHealthChecks true \
  --IncludeDocker true \
  --IncludeGitHubActions true
```

### Template Parameters
Developers are prompted for:
- **Architecture** (Clean, Layered, VerticalSlice)
- **DataAccess** (EFCore, Dapper)
- **DatabaseProvider** (SqlServer, PostgreSQL, MySQL, SQLite, InMemory)
- **Mapper** (AutoMapper, Mapster)
- **Authentication** (JWT, OAuth2)
- **TestingFramework** (xUnit, NUnit)
- **Caching** (HybridCache, Redis, InMemory)
- **UseSwagger** (true/false)
- **UseHealthChecks** (true/false)
- **UseMinimalApis** (true/false)
- **IncludeDocker** (true/false)
- **IncludeGitHubActions** (true/false)

---

## 🏗️ Complete Template Structure

The template contains **all three architectures** in separate folders:

```
MyCompany.WebApi.Template/
│
├── .template.config/
│   └── template.json              # Defines parameters and conditional logic
│ 
├── src/
│   ├── Layered/                   # Layered Architecture (conditional)
│   │   ├── Api/
│   │   ├── Business/
│   │   ├── Data/
│   │   └── Domain/
│   │
│   ├── Clean/                     # Clean Architecture (conditional)
│   │   ├── Api/
│   │   ├── Application/
│   │   ├── Domain/
│   │   └── Infrastructure/
│   │
│   └── VerticalSlice/             # Vertical Slice Architecture (conditional)
│       ├── Api/
│       ├── Features/
│       ├── Domain/
│       ├── Infrastructure/
│       └── Shared/
│
├── tests/                         # Testing projects (shared across architectures)
│   ├── UnitTests/
│   │   ├── Application/
│   │   ├── Domain/
│   │   └── MyService.UnitTests.csproj
│   │
│   ├── IntegrationTests/
│   │   ├── Api/
│   │   └── MyService.IntegrationTests.csproj
│   │
│   └── Fixtures/
│       ├── Builders/
│       ├── TestData/
│       └── MyService.Fixtures.csproj
│
├── .github/
│   └── workflows/
│       └── dotnet.yml             # GitHub Actions CI/CD (optional)
│
├── docker-compose.yml             # Docker Compose (optional)
├── Dockerfile                     # Docker support (optional)
├── .gitignore
├── README.md
└── QUICKSTART.md
```

**Note:** Based on the `Architecture` parameter, only the selected architecture folder and its projects are included in the generated solution.

---

## 🔧 Configuration & Features

All templates should include: Each archtecure should have its own folder and be conditionally included based on the `Architecture` parameter and provided identical enterprise features.

- **.NET 9+ Web API project**
- **Minimal API** or **Controller-based** setup (choose one and justify)
- **Swagger (OpenAPI)** with versioning
- **Serilog** for structured logging (Console/File/Any other sink )
- **Authentication** based on chosen method (JWT or OAuth2)
- **Configurable database connection** (SQL Server, PostgreSQL, MySQL, SQLite, InMemory)
- **Health Checks** at `/health`
- **CORS** configurable origins
- **Dependency Injection** configured centrally
- **FluentValidation** for request validation
- **API Versioning**
- **Global Exception Middleware**
- **Health Checks endpoint** (`/health`)
- **AppSettings-based configuration** And Env for Docker or 
- **Dockerfile** , .dockerignore and `docker-compose.yml`
- **Makefile / PowerShell script** for build, test, run tasks
- **Unit + Integration Tests + Fixtures setup**

### ⚙️ Configurable Components
Prompt the user to **choose technology options** while scaffolding:

| Category | Option 1 | Option 2 |
|-----------|-----------|----------|
| ORM | `Entity Framework Core` | `Dapper` |
| Object Mapper | `AutoMapper` | `Mapster` |
| Auth | `JWT` | `OAuth2` |
| Validation | `FluentValidation` | *(always included)* |
| Logging | `Serilog` | *(always included)* |
| API Docs | `Swagger (Swashbuckle)` | *(always included)* |

---

## 🗃️ Example `appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AppDb;User Id=sa;Password=your_password;"
  },
  "Authentication": {
    "Provider": "JWT", // or "OAuth2"
    "Jwt": {
      "Key": "your_secret_key_here",
      "Issuer": "YourApp",
      "Audience": "YourAppUsers"
    }
  },
  "Serilog": {
    "MinimumLevel": "Information"
  },
  "AllowedHosts": "*"
}
````

---

## 🧩 Developer Experience

* Auto-generated:

  * `README.md` with setup, run, and test instructions
  * `.editorconfig`, `.gitignore`
  * Global `using` statements to simplify imports
* Include example WeatherForecast endpoint with repository and service pattern
* Setup Swagger UI available by default in Development environment
* Unit + Integration Tests + Fixtures setup

---

## 🧪 Testing & Fixtures

### Unit Tests

* **xUnit + FluentAssertions + Moq**
* Focus: Application logic, domain rules, validators
* Configurable per architecture

### Integration Tests

* **xUnit + TestContainers + WebApplicationFactory**
* Focus: full API + database behavior
* Test database containerized (SQL Server/PostgreSQL)

### Fixtures

Located under `/tests/Fixtures`:

```
/Fixtures
  /DataBuilders
  /SeedData
  /Mocks
```

Provide reusable:

* Builders for entities (e.g., `UserBuilder`)
* Seed data for integration tests
* Mocks for external dependencies

---

### Example Fixture

```csharp
public class UserBuilder
{
    private readonly User _user = new()
    {
        Id = Guid.NewGuid(),
        Name = "John Doe",
        Email = "john@sample.com"
    };

    public UserBuilder WithEmail(string email)
    {
        _user.Email = email;
        return this;
    }

    public User Build() => _user;
}
```

---

## 🧰 Developer Commands

```bash
# Create new project
dotnet new webapi -n MyProject

# Build solution
dotnet build

# Run migrations (if EF Core)
dotnet ef database update

# Run API
dotnet run

# Run unit tests
dotnet test tests/UnitTests

# Run integration tests
dotnet test tests/IntegrationTests
```

Swagger: `https://localhost:5001/swagger`
Health check: `https://localhost:5001/health`

---

## 🧩 Deliverables

✅ Configurable architecture: Layered / Clean / Vertical Slice
✅ Selectable stack: EF/Dapper, AutoMapper/Mapster, JWT/OAuth2
✅ Complete testing + fixtures setup
✅ Production-ready defaults (Serilog, Swagger, Docker)
✅ Modular structure for reuse and extension

---

## 💡 Copilot Scaffolding Instructions

When generating the template project:

### 1. **Template Structure Requirements**
1. Provide **three mutually exclusive architecture roots**: `src/Layered/`, `src/Clean/`, `src/VerticalSlice/` (all present in the template source; only one emitted at instantiation).
2. Define all parameters, symbols, and conditional logic in `.template.config/template.json` (avoid ad‑hoc scripting where possible).
3. In **C# source files** use standard preprocessor directives: `#if SYMBOL`, `#elif`, `#endif` for conditional code blocks.
4. In **XML files** (`.csproj`, `Directory.Build.props`, etc.) use the .NET template engine comment syntax: `<!--#if (Condition) -->`, `<!--#elif (Condition) -->`, `<!--#endif -->` — do NOT use `#if` bare (prevents `<#text>` errors).
5. Use `modifiers` in `template.json` to exclude non-selected architecture folders, e.g.:
  ```json
  "modifiers": [
    { "condition": "(Architecture != 'Clean')", "exclude": ["src/Clean/**"] },
    { "condition": "(Architecture != 'Layered')", "exclude": ["src/Layered/**"] },
    { "condition": "(Architecture != 'VerticalSlice')", "exclude": ["src/VerticalSlice/**"] }
  ]
  ```
6. (Optional) Add a `postActions` entry to auto-run a solution creation script after instantiation.
7. Ensure every emitted project is buildable without manual edits (no `TODO`, no placeholder namespaces).

### 2. **Prompt Developer For (Parameters)**
Each of the following becomes a `symbol` in `template.json` (type: `choice` or `bool`) and drives conditional inclusion of code, packages, and configuration:

- `Architecture`: `Layered` | `Clean` | `VerticalSlice`
- `DataAccess`: `EFCore` | `Dapper`
- `DatabaseProvider`: `SqlServer` | `PostgreSQL` | `MySQL` | `SQLite` | `InMemory`
- `Mapper`: `AutoMapper` | `Mapster`
- `Authentication`: `JWT` | `OAuth2`
- `TestingFramework`: `xUnit` | `NUnit`
- `Caching`: `HybridCache` | `Redis` | `InMemory`
- `UseSwagger`: `true` | `false`
- `UseHealthChecks`: `true` | `false`
- `UseMinimalApis`: `true` | `false`
- `IncludeDocker`: `true` | `false`
- `IncludeGitHubActions`: `true` | `false`

All choices must cascade to: NuGet package references, DI registrations, example code, and documentation sections.

### 3. **Generate Architecture-Specific Code**
   - **Layered:** Api, Business, Data, Domain projects with service layers
   - **Clean:** Api, Application, Domain, Infrastructure with MediatR and CQRS
   - **Vertical Slice:** Api, Features, Domain, Infrastructure, Shared with feature slices

### 4. **Configure Dependencies Based on Choices**
   - Add appropriate NuGet packages based on selections
   - Configure database provider-specific packages
   - Include authentication libraries (JWT or Microsoft.Identity.Web)
   - Add mapper libraries (AutoMapper or Mapster)
   - Configure caching packages (HybridCache, Redis, or InMemory)

### 5. **Generate Complete, Working Code**
   - No placeholders or `TODO` comments
   - Fully functional `Program.cs` with conditional registration
   - Complete repository implementations
   - Working controllers or minimal API endpoints
   - Functional validation rules
   - Complete test examples

### 6. **Add Configuration Files**
   - `appsettings.json` with all necessary sections
   - Connection strings for selected database
   - Authentication settings (JWT or OAuth2)
   - Serilog configuration
   - Caching options

### 7. **Include DevOps Files** (if selected)
   - `Dockerfile` for containerization
   - `docker-compose.yml` with database and Redis services
   - `.github/workflows/dotnet.yml` for CI/CD

### 8. **Generate Documentation**
   - Comprehensive `README.md` with architecture explanation
   - `QUICKSTART.md` with common commands
   - Inline code comments explaining patterns

---

## 🗣️ Usage (in VS Code with Copilot)

After adding this file:

1. Open **Copilot Chat**
2. Run:

   ```bash
   /prompt ScaffoldDotNetWebApiTemplate
   ```
3. Copilot will:

   * Ask for your architecture and stack preferences
   * Scaffold the project accordingly

Example dialogue:

```
Copilot: Choose architecture → [1] Simple Layered [2] Clean [3] Vertical Slice
User: 2
Copilot: Choose ORM → [1] EF Core [2] Dapper
User: 1
Copilot: Choose Mapper → [1] AutoMapper [2] Mapster
User: 2
Copilot: Choose Auth → [1] JWT [2] OAuth2
User: 1
```

Then Copilot generates the appropriate solution.

---

## 🧩 Optional Future Enhancements

* ✅ Add CLI prompt automation for selections
* ✅ Add CI/CD GitHub Actions workflow
* ✅ Integrate SonarQube or CodeQL
* ✅ Include sample domain (e.g., Users/Products)
* ✅ Extend template with OpenTelemetry & Metrics

---

🧭 **This prompt creates a flexible, configurable .NET 9 Web API starter kit**



# Simple Prompt
/*
Create a .NET solution template which prompts developers for the following configuration options:

- Architecture style: Clean, Layered, or Vertical Slice
- ORM: EF Core or Dapper
- Database: SQL Server,PostgreSQL,MySQL, SQLite, InMemory
- Object mapper: AutoMapper or Mapster
- Authentication: JWT or OAuth2
- Validation: FluentValidation
- Logging: Serilog
- API documentation: Swagger (OpenAPI)
- Testing setup: xUnit or NUnit, with full fixtures/sample tests
- Hybrid cache: HybridCache or None
- Caching: Redis or in-memory

- docker support (Dokerfile + .dokerignore, docker-compose.yml) 
- GitHub Actions CI/CD workflow (Conditional)
- opentelemetry support (Conditional)
- metrics support (Conditional)
- health checks (Conditional)
- Azure cosmosdb Repository (Conditional)
- Rag service with azure OpenAI (Conditional)
- OIDC authentication (Conditional)

Requirements:
- Use dotnet template configuration files to enable developer choices at scaffolding time.
- Ensure selected options result in code, config, and dependency setup for the chosen stack.
- Scaffold production-ready patterns including dependency injection, logging, caching, health checks, validation, and test projects.
- Each stack/component choice (e.g., ORM, database, object mapper, cache) should result in appropriate code and configuration.
- Generated solution should be ready to run after developer answers prompts.

Output:
- Complete .NET solution template with interactive prompts based on the above.
*/


## 📦 Usage
```bash
# Install template
cd templates\MyCompany.WebApi.Template
dotnet new install .

# Create projects with different architectures
dotnet new webapi-advanced -n MyApi --Architecture Clean
dotnet new webapi-advanced -n MyApi --Architecture Layered  
dotnet new webapi-advanced -n MyApi --Architecture VerticalSlice

```