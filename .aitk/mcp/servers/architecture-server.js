import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * .NET Multi-Architecture MCP Server
 * Supports: Clean Architecture, Layered Architecture, Vertical Slice Architecture
 */
class DotNetArchitectureServer {
  constructor() {
    this.workspaceRoot = process.env.WORKSPACE_ROOT || process.cwd();
    this.templatesPath = process.env.TEMPLATES_PATH || path.join(this.workspaceRoot, "templates");
    
    this.server = new Server(
      {
        name: "dotnet-architecture-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "generate_clean_feature",
          description: "Generate complete Clean Architecture feature with Domain, Application, Infrastructure, and API layers",
          inputSchema: {
            type: "object",
            properties: {
              featureName: {
                type: "string",
                description: "Name of the feature (e.g., Product, Order, Customer)"
              },
              entityProperties: {
                type: "array",
                description: "Properties for the domain entity",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    type: { type: "string" },
                    isRequired: { type: "boolean" },
                    isValueObject: { type: "boolean" }
                  },
                  required: ["name", "type"]
                }
              },
              operations: {
                type: "array",
                description: "CRUD operations to generate",
                items: {
                  type: "string",
                  enum: ["Create", "Read", "Update", "Delete", "List"]
                }
              },
              includeDomainEvents: { type: "boolean", default: false },
              includeValidation: { type: "boolean", default: true },
              includeTests: { type: "boolean", default: true }
            },
            required: ["featureName", "entityProperties", "operations"]
          }
        },
        {
          name: "generate_layered_feature",
          description: "Generate complete Layered Architecture feature with Domain, Data, Business, and API layers",
          inputSchema: {
            type: "object",
            properties: {
              featureName: {
                type: "string",
                description: "Name of the feature"
              },
              entityProperties: {
                type: "array",
                description: "Properties for the entity",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    type: { type: "string" },
                    isRequired: { type: "boolean" }
                  }
                }
              },
              operations: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["Create", "Read", "Update", "Delete", "List"]
                }
              },
              includeValidation: { type: "boolean", default: true },
              includeTests: { type: "boolean", default: true }
            },
            required: ["featureName", "entityProperties", "operations"]
          }
        },
        {
          name: "generate_vertical_slice",
          description: "Generate Vertical Slice Architecture feature with all operations in feature folder",
          inputSchema: {
            type: "object",
            properties: {
              featureName: {
                type: "string",
                description: "Name of the feature"
              },
              entityProperties: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    type: { type: "string" },
                    isRequired: { type: "boolean" }
                  }
                }
              },
              operations: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["Create", "Read", "Update", "Delete", "List"]
                }
              },
              useMinimalApis: { type: "boolean", default: true },
              includeValidation: { type: "boolean", default: true },
              includeTests: { type: "boolean", default: true }
            },
            required: ["featureName", "entityProperties", "operations"]
          }
        },
        {
          name: "generate_domain_entity",
          description: "Generate DDD domain entity with value objects and domain events",
          inputSchema: {
            type: "object",
            properties: {
              entityName: { type: "string" },
              properties: { type: "array" },
              valueObjects: { type: "array" },
              domainEvents: { type: "array" },
              architecture: {
                type: "string",
                enum: ["Clean", "Layered", "VerticalSlice"]
              }
            },
            required: ["entityName", "properties", "architecture"]
          }
        },
        {
          name: "generate_command_query",
          description: "Generate CQRS command or query with MediatR handler",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string" },
              type: {
                type: "string",
                enum: ["Command", "Query"]
              },
              properties: { type: "array" },
              returnType: { type: "string" },
              includeValidator: { type: "boolean", default: true },
              architecture: {
                type: "string",
                enum: ["Clean", "Layered", "VerticalSlice"]
              }
            },
            required: ["name", "type", "returnType", "architecture"]
          }
        },
        {
          name: "generate_repository",
          description: "Generate repository interface and implementation",
          inputSchema: {
            type: "object",
            properties: {
              entityName: { type: "string" },
              customMethods: { type: "array" },
              architecture: {
                type: "string",
                enum: ["Clean", "Layered", "VerticalSlice"]
              }
            },
            required: ["entityName", "architecture"]
          }
        },
        {
          name: "generate_api_endpoints",
          description: "Generate API endpoints (Controller or Minimal API)",
          inputSchema: {
            type: "object",
            properties: {
              featureName: { type: "string" },
              operations: { type: "array" },
              useMinimalApis: { type: "boolean", default: false },
              architecture: {
                type: "string",
                enum: ["Clean", "Layered", "VerticalSlice"]
              }
            },
            required: ["featureName", "operations", "architecture"]
          }
        },
        {
          name: "generate_tests",
          description: "Generate unit and integration tests",
          inputSchema: {
            type: "object",
            properties: {
              featureName: { type: "string" },
              operations: { type: "array" },
              testFramework: {
                type: "string",
                enum: ["xUnit", "NUnit"],
                default: "xUnit"
              },
              architecture: {
                type: "string",
                enum: ["Clean", "Layered", "VerticalSlice"]
              }
            },
            required: ["featureName", "operations", "architecture"]
          }
        },
        {
          name: "analyze_architecture_patterns",
          description: "Analyze existing code to learn architecture patterns and conventions",
          inputSchema: {
            type: "object",
            properties: {
              architecture: {
                type: "string",
                enum: ["Clean", "Layered", "VerticalSlice"]
              }
            },
            required: ["architecture"]
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "generate_clean_feature":
            return await this.generateCleanFeature(args);
          case "generate_layered_feature":
            return await this.generateLayeredFeature(args);
          case "generate_vertical_slice":
            return await this.generateVerticalSlice(args);
          case "generate_domain_entity":
            return await this.generateDomainEntity(args);
          case "generate_command_query":
            return await this.generateCommandQuery(args);
          case "generate_repository":
            return await this.generateRepository(args);
          case "generate_api_endpoints":
            return await this.generateApiEndpoints(args);
          case "generate_tests":
            return await this.generateTests(args);
          case "analyze_architecture_patterns":
            return await this.analyzeArchitecturePatterns(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ error: error.message, stack: error.stack }, null, 2)
          }],
          isError: true
        };
      }
    });
  }

  // Clean Architecture Generator
  async generateCleanFeature(args) {
    const { featureName, entityProperties, operations, includeDomainEvents, includeValidation, includeTests } = args;
    const generatedFiles = [];

    // 1. Domain Entity
    const entityCode = this.generateCleanEntity(featureName, entityProperties, includeDomainEvents);
    generatedFiles.push({
      path: `src/Clean/Domain/Entities/${featureName}.cs`,
      content: entityCode
    });

    // 2. Domain Events (if requested)
    if (includeDomainEvents) {
      const eventCode = this.generateDomainEvents(featureName);
      generatedFiles.push({
        path: `src/Clean/Domain/Events/${featureName}CreatedEvent.cs`,
        content: eventCode
      });
    }

    // 3. Application Layer - Commands & Queries
    for (const operation of operations) {
      const appFiles = await this.generateCleanOperation(featureName, operation, entityProperties, includeValidation);
      generatedFiles.push(...appFiles);
    }

    // 4. Infrastructure - Repository
    const repoFiles = this.generateCleanRepository(featureName);
    generatedFiles.push(...repoFiles);

    // 5. API Controller
    const controllerCode = this.generateCleanController(featureName, operations);
    generatedFiles.push({
      path: `src/Clean/Api/Controllers/${featureName}Controller.cs`,
      content: controllerCode
    });

    // 6. Tests
    if (includeTests) {
      const testFiles = this.generateCleanTests(featureName, operations);
      generatedFiles.push(...testFiles);
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          success: true,
          architecture: "Clean Architecture",
          feature: featureName,
          filesGenerated: generatedFiles.length,
          files: generatedFiles
        }, null, 2)
      }]
    };
  }

  generateCleanEntity(featureName, properties, includeDomainEvents) {
    const propertyDeclarations = properties.map(p => 
      `    public ${p.type} ${p.name} { get; private set; }${p.isRequired ? ' = null!;' : ''}`
    ).join('\n');

    const domainEventSupport = includeDomainEvents ? `
    private readonly List<IDomainEvent> _domainEvents = new();
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    public void AddDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }` : '';

    return `using MyService.Domain.Common;
using MyService.Domain.Events;

namespace MyService.Domain.Entities;

public class ${featureName} : BaseEntity
{
${propertyDeclarations}
${domainEventSupport}

    private ${featureName}() { } // EF Core

    public static ${featureName} Create(${properties.map(p => `${p.type} ${p.name.toLowerCase()}`).join(', ')})
    {
        var entity = new ${featureName}
        {
${properties.map(p => `            ${p.name} = ${p.name.toLowerCase()},`).join('\n')}
        };

        ${includeDomainEvents ? `entity.AddDomainEvent(new ${featureName}CreatedEvent(entity.Id));` : ''}
        
        return entity;
    }

    public void Update(${properties.map(p => `${p.type} ${p.name.toLowerCase()}`).join(', ')})
    {
${properties.map(p => `        ${p.name} = ${p.name.toLowerCase()};`).join('\n')}
        UpdatedAt = DateTime.UtcNow;
    }
}`;
  }

  generateDomainEvents(featureName) {
    return `using MyService.Domain.Common;

namespace MyService.Domain.Events;

public record ${featureName}CreatedEvent(int ${featureName}Id) : IDomainEvent;

public record ${featureName}UpdatedEvent(int ${featureName}Id) : IDomainEvent;

public record ${featureName}DeletedEvent(int ${featureName}Id) : IDomainEvent;`;
  }

  async generateCleanOperation(featureName, operation, properties, includeValidation) {
    const files = [];
    const namespace = "MyService.Application";

    switch (operation) {
      case "Create":
        const createCmd = `using MediatR;
using MyService.Application.Common.Models;
using MyService.Application.Interfaces;
using MyService.Domain.Entities;

namespace ${namespace}.Features.${featureName}.Commands;

public record Create${featureName}Command(
    ${properties.map(p => `${p.type} ${p.name}`).join(',\n    ')}
) : IRequest<Result<int>>;

public class Create${featureName}Handler : IRequestHandler<Create${featureName}Command, Result<int>>
{
    private readonly IApplicationDbContext _context;

    public Create${featureName}Handler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<int>> Handle(Create${featureName}Command request, CancellationToken cancellationToken)
    {
        var entity = ${featureName}.Create(
            ${properties.map(p => `request.${p.name}`).join(',\n            ')}
        );

        _context.${featureName}s.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return Result<int>.Success(entity.Id);
    }
}`;

        files.push({
          path: `src/Clean/Application/Features/${featureName}/Commands/Create${featureName}.cs`,
          content: createCmd
        });

        if (includeValidation) {
          const validator = `using FluentValidation;

namespace ${namespace}.Features.${featureName}.Commands;

public class Create${featureName}Validator : AbstractValidator<Create${featureName}Command>
{
    public Create${featureName}Validator()
    {
${properties.filter(p => p.isRequired).map(p => `        RuleFor(x => x.${p.name}).NotEmpty().WithMessage("${p.name} is required");`).join('\n')}
    }
}`;
          files.push({
            path: `src/Clean/Application/Features/${featureName}/Commands/Create${featureName}Validator.cs`,
            content: validator
          });
        }
        break;

      case "Read":
        const readQuery = `using MediatR;
using Microsoft.EntityFrameworkCore;
using MyService.Application.Common.Models;
using MyService.Application.Interfaces;

namespace ${namespace}.Features.${featureName}.Queries;

public record Get${featureName}Query(int Id) : IRequest<Result<${featureName}Dto>>;

public class Get${featureName}Handler : IRequestHandler<Get${featureName}Query, Result<${featureName}Dto>>
{
    private readonly IApplicationDbContext _context;

    public Get${featureName}Handler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<${featureName}Dto>> Handle(Get${featureName}Query request, CancellationToken cancellationToken)
    {
        var entity = await _context.${featureName}s
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
            return Result<${featureName}Dto>.Failure($"${featureName} with ID {request.Id} not found");

        var dto = new ${featureName}Dto
        {
            Id = entity.Id,
${properties.map(p => `            ${p.name} = entity.${p.name},`).join('\n')}
        };

        return Result<${featureName}Dto>.Success(dto);
    }
}

public class ${featureName}Dto
{
    public int Id { get; init; }
${properties.map(p => `    public ${p.type} ${p.name} { get; init; }`).join('\n')}
}`;
        files.push({
          path: `src/Clean/Application/Features/${featureName}/Queries/Get${featureName}.cs`,
          content: readQuery
        });
        break;

      case "Update":
        const updateCmd = `using MediatR;
using Microsoft.EntityFrameworkCore;
using MyService.Application.Common.Models;
using MyService.Application.Interfaces;

namespace ${namespace}.Features.${featureName}.Commands;

public record Update${featureName}Command(
    int Id,
    ${properties.map(p => `${p.type} ${p.name}`).join(',\n    ')}
) : IRequest<Result<bool>>;

public class Update${featureName}Handler : IRequestHandler<Update${featureName}Command, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public Update${featureName}Handler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(Update${featureName}Command request, CancellationToken cancellationToken)
    {
        var entity = await _context.${featureName}s
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
            return Result<bool>.Failure($"${featureName} with ID {request.Id} not found");

        entity.Update(
            ${properties.map(p => `request.${p.name}`).join(',\n            ')}
        );

        await _context.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }
}`;
        files.push({
          path: `src/Clean/Application/Features/${featureName}/Commands/Update${featureName}.cs`,
          content: updateCmd
        });
        break;

      case "Delete":
        const deleteCmd = `using MediatR;
using Microsoft.EntityFrameworkCore;
using MyService.Application.Common.Models;
using MyService.Application.Interfaces;

namespace ${namespace}.Features.${featureName}.Commands;

public record Delete${featureName}Command(int Id) : IRequest<Result<bool>>;

public class Delete${featureName}Handler : IRequestHandler<Delete${featureName}Command, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public Delete${featureName}Handler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(Delete${featureName}Command request, CancellationToken cancellationToken)
    {
        var entity = await _context.${featureName}s
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
            return Result<bool>.Failure($"${featureName} with ID {request.Id} not found");

        _context.${featureName}s.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }
}`;
        files.push({
          path: `src/Clean/Application/Features/${featureName}/Commands/Delete${featureName}.cs`,
          content: deleteCmd
        });
        break;

      case "List":
        const listQuery = `using MediatR;
using Microsoft.EntityFrameworkCore;
using MyService.Application.Common.Models;
using MyService.Application.Interfaces;
using MyService.Application.Features.${featureName}.Queries;

namespace ${namespace}.Features.${featureName}.Queries;

public record List${featureName}Query(
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<Result<PaginatedList<${featureName}Dto>>>;

public class List${featureName}Handler : IRequestHandler<List${featureName}Query, Result<PaginatedList<${featureName}Dto>>>
{
    private readonly IApplicationDbContext _context;

    public List${featureName}Handler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PaginatedList<${featureName}Dto>>> Handle(List${featureName}Query request, CancellationToken cancellationToken)
    {
        var query = _context.${featureName}s
            .OrderByDescending(x => x.CreatedAt)
            .AsQueryable();

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(x => new ${featureName}Dto
            {
                Id = x.Id,
${properties.map(p => `                ${p.name} = x.${p.name},`).join('\n')}
            })
            .ToListAsync(cancellationToken);

        var result = new PaginatedList<${featureName}Dto>(items, totalCount, request.PageNumber, request.PageSize);
        return Result<PaginatedList<${featureName}Dto>>.Success(result);
    }
}`;
        files.push({
          path: `src/Clean/Application/Features/${featureName}/Queries/List${featureName}.cs`,
          content: listQuery
        });
        break;
    }

    return files;
  }

  generateCleanRepository(featureName) {
    const interfaceCode = `using MyService.Domain.Entities;

namespace MyService.Application.Interfaces;

public interface I${featureName}Repository
{
    Task<${featureName}?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<List<${featureName}>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<${featureName}> AddAsync(${featureName} entity, CancellationToken cancellationToken = default);
    Task UpdateAsync(${featureName} entity, CancellationToken cancellationToken = default);
    Task DeleteAsync(${featureName} entity, CancellationToken cancellationToken = default);
}`;

    const implCode = `using Microsoft.EntityFrameworkCore;
using MyService.Application.Interfaces;
using MyService.Domain.Entities;
using MyService.Infrastructure.Persistence;

namespace MyService.Infrastructure.Repositories;

public class ${featureName}Repository : I${featureName}Repository
{
    private readonly ApplicationDbContext _context;

    public ${featureName}Repository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<${featureName}?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.${featureName}s.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<List<${featureName}>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.${featureName}s.ToListAsync(cancellationToken);
    }

    public async Task<${featureName}> AddAsync(${featureName} entity, CancellationToken cancellationToken = default)
    {
        await _context.${featureName}s.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task UpdateAsync(${featureName} entity, CancellationToken cancellationToken = default)
    {
        _context.${featureName}s.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(${featureName} entity, CancellationToken cancellationToken = default)
    {
        _context.${featureName}s.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}`;

    return [
      {
        path: `src/Clean/Application/Interfaces/I${featureName}Repository.cs`,
        content: interfaceCode
      },
      {
        path: `src/Clean/Infrastructure/Repositories/${featureName}Repository.cs`,
        content: implCode
      }
    ];
  }

  generateCleanController(featureName, operations) {
    const endpoints = [];

    if (operations.includes("Create")) {
      endpoints.push(`    [HttpPost]
    public async Task<ActionResult<int>> Create(Create${featureName}Command command)
    {
        var result = await _mediator.Send(command);
        return result.IsSuccess 
            ? CreatedAtAction(nameof(GetById), new { id = result.Value }, result.Value)
            : BadRequest(result.Error);
    }`);
    }

    if (operations.includes("Read")) {
      endpoints.push(`    [HttpGet("{id}")]
    public async Task<ActionResult<${featureName}Dto>> GetById(int id)
    {
        var result = await _mediator.Send(new Get${featureName}Query(id));
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Error);
    }`);
    }

    if (operations.includes("Update")) {
      endpoints.push(`    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, Update${featureName}Command command)
    {
        if (id != command.Id)
            return BadRequest("ID mismatch");

        var result = await _mediator.Send(command);
        return result.IsSuccess ? NoContent() : NotFound(result.Error);
    }`);
    }

    if (operations.includes("Delete")) {
      endpoints.push(`    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await _mediator.Send(new Delete${featureName}Command(id));
        return result.IsSuccess ? NoContent() : NotFound(result.Error);
    }`);
    }

    if (operations.includes("List")) {
      endpoints.push(`    [HttpGet]
    public async Task<ActionResult<PaginatedList<${featureName}Dto>>> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _mediator.Send(new List${featureName}Query(pageNumber, pageSize));
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
    }`);
    }

    return `using MediatR;
using Microsoft.AspNetCore.Mvc;
using MyService.Application.Features.${featureName}.Commands;
using MyService.Application.Features.${featureName}.Queries;

namespace MyService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ${featureName}Controller : ControllerBase
{
    private readonly IMediator _mediator;

    public ${featureName}Controller(IMediator mediator)
    {
        _mediator = mediator;
    }

${endpoints.join('\n\n')}
}`;
  }

  generateCleanTests(featureName, operations) {
    const testCode = `using FluentAssertions;
using MyService.Application.Features.${featureName}.Commands;
using MyService.Application.Features.${featureName}.Queries;
using Xunit;

namespace MyService.UnitTests.Application.Features.${featureName};

public class ${featureName}HandlerTests
{
    [Fact]
    public async Task Create${featureName}_ShouldReturnSuccess_WhenValidInput()
    {
        // Arrange
        // TODO: Setup mock dependencies
        
        // Act
        // TODO: Call handler
        
        // Assert
        // TODO: Verify result
        Assert.True(true); // Placeholder
    }

    [Fact]
    public async Task Get${featureName}_ShouldReturnNotFound_WhenIdDoesNotExist()
    {
        // Arrange
        // TODO: Setup mock dependencies
        
        // Act
        // TODO: Call handler
        
        // Assert
        // TODO: Verify result
        Assert.True(true); // Placeholder
    }
}`;

    return [{
      path: `tests/UnitTests/Application/Features/${featureName}/${featureName}HandlerTests.cs`,
      content: testCode
    }];
  }

  // Layered Architecture Generator
  async generateLayeredFeature(args) {
    const { featureName, entityProperties, operations, includeValidation, includeTests } = args;
    const generatedFiles = [];

    // 1. Domain Entity
    const entityCode = this.generateLayeredEntity(featureName, entityProperties);
    generatedFiles.push({
      path: `src/Layered/Domain/Entities/${featureName}.cs`,
      content: entityCode
    });

    // 2. Data Layer - Repository
    const repoFiles = this.generateLayeredRepository(featureName);
    generatedFiles.push(...repoFiles);

    // 3. Business Layer - Service
    const serviceFiles = this.generateLayeredService(featureName, entityProperties, operations, includeValidation);
    generatedFiles.push(...serviceFiles);

    // 4. API Controller
    const controllerCode = this.generateLayeredController(featureName, operations);
    generatedFiles.push({
      path: `src/Layered/Api/Controllers/${featureName}Controller.cs`,
      content: controllerCode
    });

    // 5. Tests
    if (includeTests) {
      const testFiles = this.generateLayeredTests(featureName, operations);
      generatedFiles.push(...testFiles);
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          success: true,
          architecture: "Layered Architecture",
          feature: featureName,
          filesGenerated: generatedFiles.length,
          files: generatedFiles
        }, null, 2)
      }]
    };
  }

  generateLayeredEntity(featureName, properties) {
    const propertyDeclarations = properties.map(p => 
      `    public ${p.type} ${p.name} { get; set; }${p.isRequired ? ' = null!;' : ''}`
    ).join('\n');

    return `namespace MyService.Domain.Entities;

public class ${featureName}
{
    public int Id { get; set; }
${propertyDeclarations}
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}`;
  }

  generateLayeredRepository(featureName) {
    const interfaceCode = `using MyService.Domain.Entities;

namespace MyService.Data.Interfaces;

public interface I${featureName}Repository
{
    Task<${featureName}?> GetByIdAsync(int id);
    Task<IEnumerable<${featureName}>> GetAllAsync();
    Task<${featureName}> AddAsync(${featureName} entity);
    Task UpdateAsync(${featureName} entity);
    Task DeleteAsync(int id);
}`;

    const implCode = `using Microsoft.EntityFrameworkCore;
using MyService.Data.Context;
using MyService.Data.Interfaces;
using MyService.Domain.Entities;

namespace MyService.Data.Repositories;

public class ${featureName}Repository : I${featureName}Repository
{
    private readonly ApplicationDbContext _context;

    public ${featureName}Repository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<${featureName}?> GetByIdAsync(int id)
    {
        return await _context.${featureName}s.FindAsync(id);
    }

    public async Task<IEnumerable<${featureName}>> GetAllAsync()
    {
        return await _context.${featureName}s.ToListAsync();
    }

    public async Task<${featureName}> AddAsync(${featureName} entity)
    {
        entity.CreatedAt = DateTime.UtcNow;
        await _context.${featureName}s.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(${featureName} entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        _context.${featureName}s.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _context.${featureName}s.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}`;

    return [
      {
        path: `src/Layered/Data/Interfaces/I${featureName}Repository.cs`,
        content: interfaceCode
      },
      {
        path: `src/Layered/Data/Repositories/${featureName}Repository.cs`,
        content: implCode
      }
    ];
  }

  generateLayeredService(featureName, properties, operations, includeValidation) {
    const interfaceCode = `using MyService.Domain.Entities;

namespace MyService.Business.Interfaces;

public interface I${featureName}Service
{
    Task<${featureName}?> GetByIdAsync(int id);
    Task<IEnumerable<${featureName}>> GetAllAsync();
    Task<${featureName}> CreateAsync(${featureName} entity);
    Task UpdateAsync(${featureName} entity);
    Task DeleteAsync(int id);
}`;

    const implCode = `using MyService.Business.Interfaces;
using MyService.Data.Interfaces;
using MyService.Domain.Entities;

namespace MyService.Business.Services;

public class ${featureName}Service : I${featureName}Service
{
    private readonly I${featureName}Repository _repository;

    public ${featureName}Service(I${featureName}Repository repository)
    {
        _repository = repository;
    }

    public async Task<${featureName}?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<${featureName}>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<${featureName}> CreateAsync(${featureName} entity)
    {
        // Business logic here
        return await _repository.AddAsync(entity);
    }

    public async Task UpdateAsync(${featureName} entity)
    {
        // Business logic here
        await _repository.UpdateAsync(entity);
    }

    public async Task DeleteAsync(int id)
    {
        // Business logic here
        await _repository.DeleteAsync(id);
    }
}`;

    return [
      {
        path: `src/Layered/Business/Interfaces/I${featureName}Service.cs`,
        content: interfaceCode
      },
      {
        path: `src/Layered/Business/Services/${featureName}Service.cs`,
        content: implCode
      }
    ];
  }

  generateLayeredController(featureName, operations) {
    return `using Microsoft.AspNetCore.Mvc;
using MyService.Business.Interfaces;
using MyService.Domain.Entities;

namespace MyService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ${featureName}Controller : ControllerBase
{
    private readonly I${featureName}Service _service;

    public ${featureName}Controller(I${featureName}Service service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<${featureName}>> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        return result == null ? NotFound() : Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<${featureName}>>> GetAll()
    {
        var results = await _service.GetAllAsync();
        return Ok(results);
    }

    [HttpPost]
    public async Task<ActionResult<${featureName}>> Create(${featureName} entity)
    {
        var result = await _service.CreateAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, ${featureName} entity)
    {
        if (id != entity.Id)
            return BadRequest();

        await _service.UpdateAsync(entity);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}`;
  }

  generateLayeredTests(featureName, operations) {
    const testCode = `using FluentAssertions;
using Moq;
using MyService.Business.Services;
using MyService.Data.Interfaces;
using MyService.Domain.Entities;
using Xunit;

namespace MyService.UnitTests.Business.Services;

public class ${featureName}ServiceTests
{
    private readonly Mock<I${featureName}Repository> _mockRepository;
    private readonly ${featureName}Service _service;

    public ${featureName}ServiceTests()
    {
        _mockRepository = new Mock<I${featureName}Repository>();
        _service = new ${featureName}Service(_mockRepository.Object);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnEntity_WhenExists()
    {
        // Arrange
        var entity = new ${featureName} { Id = 1 };
        _mockRepository.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(entity);

        // Act
        var result = await _service.GetByIdAsync(1);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(1);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnNull_WhenNotExists()
    {
        // Arrange
        _mockRepository.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((${featureName}?)null);

        // Act
        var result = await _service.GetByIdAsync(999);

        // Assert
        result.Should().BeNull();
    }
}`;

    return [{
      path: `tests/UnitTests/Business/Services/${featureName}ServiceTests.cs`,
      content: testCode
    }];
  }

  // Vertical Slice Generator
  async generateVerticalSlice(args) {
    const { featureName, entityProperties, operations, useMinimalApis, includeValidation, includeTests } = args;
    const generatedFiles = [];

    // 1. Domain Entity
    const entityCode = this.generateVerticalEntity(featureName, entityProperties);
    generatedFiles.push({
      path: `src/VerticalSlice/Domain/Entities/${featureName}.cs`,
      content: entityCode
    });

    // 2. Feature Operations (one file per operation)
    for (const operation of operations) {
      const operationFile = this.generateVerticalOperation(featureName, operation, entityProperties, includeValidation);
      generatedFiles.push(operationFile);
    }

    // 3. Endpoints
    const endpointsCode = this.generateVerticalEndpoints(featureName, operations, useMinimalApis);
    generatedFiles.push({
      path: `src/VerticalSlice/Features/${featureName}/${featureName}Endpoints.cs`,
      content: endpointsCode
    });

    // 4. Response DTOs
    const responseDtos = this.generateVerticalResponseDtos(featureName, entityProperties);
    generatedFiles.push({
      path: `src/VerticalSlice/Features/${featureName}/${featureName}Response.cs`,
      content: responseDtos
    });

    // 5. Tests
    if (includeTests) {
      const testFiles = this.generateVerticalTests(featureName, operations);
      generatedFiles.push(...testFiles);
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          success: true,
          architecture: "Vertical Slice Architecture",
          feature: featureName,
          filesGenerated: generatedFiles.length,
          files: generatedFiles
        }, null, 2)
      }]
    };
  }

  generateVerticalEntity(featureName, properties) {
    return this.generateLayeredEntity(featureName, properties); // Same structure
  }

  generateVerticalOperation(featureName, operation, properties, includeValidation) {
    let content = '';
    const namespace = `VerticalSlice.Features.${featureName}`;

    switch (operation) {
      case "Create":
        content = `using MediatR;
using VerticalSlice.Infrastructure.Persistence;
using VerticalSlice.Shared.Results;
using FluentValidation;

namespace ${namespace};

public record Create${featureName}Command(
    ${properties.map(p => `${p.type} ${p.name}`).join(',\n    ')}
) : IRequest<Result<${featureName}Response>>;

public class Create${featureName}Handler : IRequestHandler<Create${featureName}Command, Result<${featureName}Response>>
{
    private readonly ApplicationDbContext _context;

    public Create${featureName}Handler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<${featureName}Response>> Handle(Create${featureName}Command request, CancellationToken cancellationToken)
    {
        var entity = new Domain.Entities.${featureName}
        {
${properties.map(p => `            ${p.name} = request.${p.name},`).join('\n')}
            CreatedAt = DateTime.UtcNow
        };

        _context.${featureName}s.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        var response = new ${featureName}Response
        {
            Id = entity.Id,
${properties.map(p => `            ${p.name} = entity.${p.name},`).join('\n')}
            CreatedAt = entity.CreatedAt
        };

        return Result<${featureName}Response>.Success(response);
    }
}

${includeValidation ? `public class Create${featureName}Validator : AbstractValidator<Create${featureName}Command>
{
    public Create${featureName}Validator()
    {
${properties.filter(p => p.isRequired).map(p => `        RuleFor(x => x.${p.name}).NotEmpty();`).join('\n')}
    }
}` : ''}`;
        break;

      case "Read":
        content = `using MediatR;
using Microsoft.EntityFrameworkCore;
using VerticalSlice.Infrastructure.Persistence;
using VerticalSlice.Shared.Results;

namespace ${namespace};

public record Get${featureName}Query(int Id) : IRequest<Result<${featureName}Response>>;

public class Get${featureName}Handler : IRequestHandler<Get${featureName}Query, Result<${featureName}Response>>
{
    private readonly ApplicationDbContext _context;

    public Get${featureName}Handler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<${featureName}Response>> Handle(Get${featureName}Query request, CancellationToken cancellationToken)
    {
        var entity = await _context.${featureName}s
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
            return Result<${featureName}Response>.Failure($"${featureName} not found");

        var response = new ${featureName}Response
        {
            Id = entity.Id,
${properties.map(p => `            ${p.name} = entity.${p.name},`).join('\n')}
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };

        return Result<${featureName}Response>.Success(response);
    }
}`;
        break;

      case "Update":
        content = `using MediatR;
using Microsoft.EntityFrameworkCore;
using VerticalSlice.Infrastructure.Persistence;
using VerticalSlice.Shared.Results;
using FluentValidation;

namespace ${namespace};

public record Update${featureName}Command(
    int Id,
    ${properties.map(p => `${p.type} ${p.name}`).join(',\n    ')}
) : IRequest<Result<${featureName}Response>>;

public class Update${featureName}Handler : IRequestHandler<Update${featureName}Command, Result<${featureName}Response>>
{
    private readonly ApplicationDbContext _context;

    public Update${featureName}Handler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<${featureName}Response>> Handle(Update${featureName}Command request, CancellationToken cancellationToken)
    {
        var entity = await _context.${featureName}s
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
            return Result<${featureName}Response>.Failure($"${featureName} not found");

${properties.map(p => `        entity.${p.name} = request.${p.name};`).join('\n')}
        entity.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        var response = new ${featureName}Response
        {
            Id = entity.Id,
${properties.map(p => `            ${p.name} = entity.${p.name},`).join('\n')}
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };

        return Result<${featureName}Response>.Success(response);
    }
}

${includeValidation ? `public class Update${featureName}Validator : AbstractValidator<Update${featureName}Command>
{
    public Update${featureName}Validator()
    {
        RuleFor(x => x.Id).GreaterThan(0);
${properties.filter(p => p.isRequired).map(p => `        RuleFor(x => x.${p.name}).NotEmpty();`).join('\n')}
    }
}` : ''}`;
        break;

      case "Delete":
        content = `using MediatR;
using Microsoft.EntityFrameworkCore;
using VerticalSlice.Infrastructure.Persistence;
using VerticalSlice.Shared.Results;

namespace ${namespace};

public record Delete${featureName}Command(int Id) : IRequest<Result<bool>>;

public class Delete${featureName}Handler : IRequestHandler<Delete${featureName}Command, Result<bool>>
{
    private readonly ApplicationDbContext _context;

    public Delete${featureName}Handler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(Delete${featureName}Command request, CancellationToken cancellationToken)
    {
        var entity = await _context.${featureName}s
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
            return Result<bool>.Failure($"${featureName} not found");

        _context.${featureName}s.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }
}`;
        break;

      case "List":
        content = `using MediatR;
using Microsoft.EntityFrameworkCore;
using VerticalSlice.Infrastructure.Persistence;
using VerticalSlice.Shared.Results;

namespace ${namespace};

public record List${featureName}Query(
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<Result<List${featureName}Response>>;

public class List${featureName}Handler : IRequestHandler<List${featureName}Query, Result<List${featureName}Response>>
{
    private readonly ApplicationDbContext _context;

    public List${featureName}Handler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List${featureName}Response>> Handle(List${featureName}Query request, CancellationToken cancellationToken)
    {
        var query = _context.${featureName}s
            .OrderByDescending(x => x.CreatedAt)
            .AsQueryable();

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(x => new ${featureName}Response
            {
                Id = x.Id,
${properties.map(p => `                ${p.name} = x.${p.name},`).join('\n')}
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt
            })
            .ToListAsync(cancellationToken);

        var response = new List${featureName}Response(items, totalCount, request.PageNumber, request.PageSize);
        return Result<List${featureName}Response>.Success(response);
    }
}

public record List${featureName}Response(
    List<${featureName}Response> Items,
    int TotalCount,
    int PageNumber,
    int PageSize
);`;
        break;
    }

    return {
      path: `src/VerticalSlice/Features/${featureName}/${operation}${featureName}.cs`,
      content: content
    };
  }

  generateVerticalEndpoints(featureName, operations, useMinimalApis) {
    const endpoints = [];

    if (operations.includes("Create")) {
      endpoints.push(`        group.MapPost("", async (Create${featureName}Command command, IMediator mediator) =>
        {
            var result = await mediator.Send(command);
            return result.IsSuccess 
                ? Results.Created($"/api/${featureName.toLowerCase()}/{result.Value.Id}", result.Value)
                : Results.BadRequest(result.Error);
        })
        .WithName("Create${featureName}")
        .Produces<${featureName}Response>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest);`);
    }

    if (operations.includes("Read")) {
      endpoints.push(`        group.MapGet("{id}", async (int id, IMediator mediator) =>
        {
            var result = await mediator.Send(new Get${featureName}Query(id));
            return result.IsSuccess 
                ? Results.Ok(result.Value)
                : Results.NotFound(result.Error);
        })
        .WithName("Get${featureName}")
        .Produces<${featureName}Response>()
        .ProducesProblem(StatusCodes.Status404NotFound);`);
    }

    if (operations.includes("Update")) {
      endpoints.push(`        group.MapPut("{id}", async (int id, Update${featureName}Command command, IMediator mediator) =>
        {
            if (id != command.Id)
                return Results.BadRequest("ID mismatch");
                
            var result = await mediator.Send(command);
            return result.IsSuccess 
                ? Results.Ok(result.Value)
                : Results.NotFound(result.Error);
        })
        .WithName("Update${featureName}")
        .Produces<${featureName}Response>()
        .ProducesProblem(StatusCodes.Status404NotFound);`);
    }

    if (operations.includes("Delete")) {
      endpoints.push(`        group.MapDelete("{id}", async (int id, IMediator mediator) =>
        {
            var result = await mediator.Send(new Delete${featureName}Command(id));
            return result.IsSuccess 
                ? Results.NoContent()
                : Results.NotFound(result.Error);
        })
        .WithName("Delete${featureName}")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesProblem(StatusCodes.Status404NotFound);`);
    }

    if (operations.includes("List")) {
      endpoints.push(`        group.MapGet("", async ([AsParameters] List${featureName}Query query, IMediator mediator) =>
        {
            var result = await mediator.Send(query);
            return result.IsSuccess 
                ? Results.Ok(result.Value)
                : Results.BadRequest(result.Error);
        })
        .WithName("List${featureName}")
        .Produces<List${featureName}Response>()
        .ProducesProblem(StatusCodes.Status400BadRequest);`);
    }

    return `using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace VerticalSlice.Features.${featureName};

public static class ${featureName}Endpoints
{
    public static IEndpointRouteBuilder Map${featureName}Endpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/${featureName.toLowerCase()}")
            .WithTags("${featureName}")
            .WithOpenApi();

${endpoints.join('\n\n')}

        return app;
    }
}`;
  }

  generateVerticalResponseDtos(featureName, properties) {
    return `namespace VerticalSlice.Features.${featureName};

public record ${featureName}Response
{
    public int Id { get; init; }
${properties.map(p => `    public ${p.type} ${p.name} { get; init; }`).join('\n')}
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
}`;
  }

  generateVerticalTests(featureName, operations) {
    const testCode = `using FluentAssertions;
using VerticalSlice.Features.${featureName};
using Xunit;

namespace VerticalSlice.UnitTests.Features.${featureName};

public class ${featureName}FeatureTests
{
    [Fact]
    public async Task Create${featureName}_ShouldReturnSuccess_WhenValidInput()
    {
        // Arrange
        // TODO: Setup mock dependencies
        
        // Act
        // TODO: Call handler
        
        // Assert
        Assert.True(true); // Placeholder
    }

    [Fact]
    public async Task Get${featureName}_ShouldReturnNotFound_WhenIdDoesNotExist()
    {
        // Arrange
        // TODO: Setup mock dependencies
        
        // Act
        // TODO: Call handler
        
        // Assert
        Assert.True(true); // Placeholder
    }
}`;

    return [{
      path: `tests/UnitTests/Features/${featureName}/${featureName}FeatureTests.cs`,
      content: testCode
    }];
  }

  // Placeholder methods for other tools
  async generateDomainEntity(args) {
    return { content: [{ type: "text", text: "generateDomainEntity not yet implemented" }] };
  }

  async generateCommandQuery(args) {
    return { content: [{ type: "text", text: "generateCommandQuery not yet implemented" }] };
  }

  async generateRepository(args) {
    return { content: [{ type: "text", text: "generateRepository not yet implemented" }] };
  }

  async generateApiEndpoints(args) {
    return { content: [{ type: "text", text: "generateApiEndpoints not yet implemented" }] };
  }

  async generateTests(args) {
    return { content: [{ type: "text", text: "generateTests not yet implemented" }] };
  }

  async analyzeArchitecturePatterns(args) {
    const { architecture } = args;
    const basePath = path.join(this.workspaceRoot, "templates", "MyCompany.WebApi.Template", "src", architecture);

    try {
      const patterns = {
        architecture,
        namingConventions: [],
        fileStructure: {},
        commonPatterns: []
      };

      // Analyze directory structure
      const stats = await fs.stat(basePath);
      if (stats.isDirectory()) {
        patterns.fileStructure = await this.analyzeDirectory(basePath);
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(patterns, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: "Failed to analyze architecture patterns",
            message: error.message,
            architecture,
            basePath
          }, null, 2)
        }]
      };
    }
  }

  async analyzeDirectory(dirPath, depth = 0) {
    if (depth > 3) return {}; // Limit recursion depth

    const structure = {};
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'bin' && entry.name !== 'obj') {
          structure[entry.name] = await this.analyzeDirectory(fullPath, depth + 1);
        } else if (entry.isFile() && entry.name.endsWith('.cs')) {
          structure[entry.name] = 'file';
        }
      }
    } catch (error) {
      // Silently handle permission errors
    }

    return structure;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(".NET Multi-Architecture MCP Server running on stdio");
  }
}

// Start the server
const server = new DotNetArchitectureServer();
server.run().catch(console.error);
