# 🤖 AI Toolkit & MCP Setup Guide

Complete AI-powered code generation for .NET Clean, Layered, and Vertical Slice Architectures.

## 📁 Project Structure

```
.aitk/
├── agents/                           # AI Agent configurations
│   ├── clean-architecture-agent.json
│   ├── layered-architecture-agent.json
│   └── vertical-slice-agent.json
├── mcp/                              # Model Context Protocol
│   ├── package.json
│   ├── server-config.json
│   └── servers/
│       └── architecture-server.js    # Main MCP server
└── examples/                         # Usage examples
.vscode/
├── aitk.json                         # VS Code AI Toolkit config
└── dotnet-architecture.code-snippets # Code snippets
```

## 🚀 Quick Start

### 1. Install Dependencies

The MCP (Model Context Protocol) server requires Node.js dependencies to run. This installs the `@modelcontextprotocol/sdk` package (v0.5.0) and its 16 dependencies, which enable the server to communicate with VS Code AI Toolkit and generate code.

```powershell
cd .aitk/mcp
npm install
```

**What this does:**
- Installs the MCP SDK for building the code generation server
- Enables the server to listen for tool requests from AI agents
- Provides the infrastructure for generating C# code across all three architectures

**When to run:**
- First time setup (required)
- After updating `package.json`
- When cloning the repository on a new machine
- If `node_modules` folder is deleted

### 2. Install AI Toolkit Extension

Install the Microsoft AI Toolkit extension from VS Code marketplace:

```powershell
code --install-extension ms-ai-toolkit.ai-toolkit
```

### 3. Verify Setup

```powershell
# Test MCP server
node .aitk/mcp/servers/architecture-server.js
```

## 🎯 Usage Examples

### Example 1: Generate Clean Architecture Feature

**Using AI Chat:**

```
@CleanArchitectureAgent generate a Product management feature with:
- Properties: Name (string, required), Description (string), Price (decimal, required), SKU (string, required)
- Include Create, Read, Update, Delete, List operations
- Add domain events
- Include validation and tests
```

**Using MCP Tool Directly:**

```json
{
  "tool": "generate_clean_feature",
  "args": {
    "featureName": "Product",
    "entityProperties": [
      { "name": "Name", "type": "string", "isRequired": true },
      { "name": "Description", "type": "string", "isRequired": false },
      { "name": "Price", "type": "decimal", "isRequired": true },
      { "name": "SKU", "type": "string", "isRequired": true }
    ],
    "operations": ["Create", "Read", "Update", "Delete", "List"],
    "includeDomainEvents": true,
    "includeValidation": true,
    "includeTests": true
  }
}
```

**Generated Files:**
```
src/Clean/
  Domain/Entities/Product.cs
  Domain/Events/ProductCreatedEvent.cs
  Application/Features/Product/
    Commands/CreateProduct.cs
    Commands/CreateProductValidator.cs
    Commands/UpdateProduct.cs
    Commands/DeleteProduct.cs
    Queries/GetProduct.cs
    Queries/ListProduct.cs
  Infrastructure/Repositories/ProductRepository.cs
  Api/Controllers/ProductController.cs
tests/
  UnitTests/Application/Features/Product/ProductHandlerTests.cs
```

### Example 2: Generate Layered Architecture Feature

**Using AI Chat:**

```
@LayeredArchitectureAgent create an Order feature with:
- Properties: OrderNumber (string, required), CustomerName (string, required), TotalAmount (decimal, required), Status (string, required)
- Full CRUD operations
- Include validation and unit tests
```

**Generated Files:**
```
src/Layered/
  Domain/Entities/Order.cs
  Data/
    Interfaces/IOrderRepository.cs
    Repositories/OrderRepository.cs
  Business/
    Interfaces/IOrderService.cs
    Services/OrderService.cs
  Api/Controllers/OrderController.cs
tests/
  UnitTests/Business/Services/OrderServiceTests.cs
```

### Example 3: Generate Vertical Slice Feature

**Using AI Chat:**

```
@VerticalSliceAgent generate a Customer feature with:
- Properties: FirstName, LastName, Email, Phone
- Operations: Create, Read, Update, Delete, List
- Use Minimal APIs
- Include validation and tests
```

**Using Code Snippets:**

Type `vsa-command` and press Tab:

```csharp
using MediatR;
using VerticalSlice.Infrastructure.Persistence;
using VerticalSlice.Shared.Results;
using FluentValidation;

namespace VerticalSlice.Features.Customer;

public record CreateCustomerCommand(
    string FirstName
) : IRequest<Result<CustomerResponse>>;

public class CreateCustomerHandler : IRequestHandler<CreateCustomerCommand, Result<CustomerResponse>>
{
    // Handler implementation
}

public class CreateCustomerValidator : AbstractValidator<CreateCustomerCommand>
{
    // Validation rules
}
```

**Generated Files:**
```
src/VerticalSlice/
  Domain/Entities/Customer.cs
  Features/Customer/
    CreateCustomer.cs
    GetCustomer.cs
    UpdateCustomer.cs
    DeleteCustomer.cs
    ListCustomer.cs
    CustomerEndpoints.cs
    CustomerResponse.cs
tests/
  UnitTests/Features/Customer/CustomerFeatureTests.cs
```

## 🛠️ MCP Tools Reference

### Clean Architecture Tools

| Tool | Description | Usage |
|------|-------------|-------|
| `generate_clean_feature` | Full CRUD with all layers | Complete features |
| `generate_domain_entity` | DDD entity with value objects | Domain modeling |
| `generate_command_query` | CQRS command/query | Individual operations |
| `generate_repository` | Repository pattern | Data access |
| `generate_tests` | Unit & integration tests | Testing |

### Layered Architecture Tools

| Tool | Description | Usage |
|------|-------------|-------|
| `generate_layered_feature` | Full CRUD across layers | Complete features |
| `generate_service` | Service interface + impl | Business logic |
| `generate_repository` | Repository pattern | Data access |
| `generate_api_endpoints` | Controller endpoints | API layer |
| `generate_tests` | Unit tests | Testing |

### Vertical Slice Tools

| Tool | Description | Usage |
|------|-------------|-------|
| `generate_vertical_slice` | Feature with all operations | Complete features |
| `generate_command` | Command + handler + validator | Write operations |
| `generate_query` | Query + handler | Read operations |
| `generate_endpoints` | Minimal API endpoints | API layer |
| `generate_tests` | Feature tests | Testing |

### Universal Tools

| Tool | Description | Usage |
|------|-------------|-------|
| `analyze_architecture_patterns` | Learn from existing code | Pattern discovery |

## 📝 Code Snippets Reference

### Clean Architecture Snippets

- `clean-command` - Command + Handler
- `clean-query` - Query + Handler
- `clean-validator` - FluentValidation validator
- `clean-entity` - DDD domain entity

### Layered Architecture Snippets

- `layered-service` - Service implementation
- `layered-repository` - Repository implementation

### Vertical Slice Snippets

- `vsa-command` - Command + Handler + Validator
- `vs-query` - Query + Handler
- `vs-endpoints` - Minimal API endpoints

### Universal Snippets

- `result-pattern` - Result<T> pattern
- `xunit-test` - xUnit test class

## 🎨 AI Agent Features

### Clean Architecture Agent

**Specializations:**
- Domain-Driven Design
- CQRS with MediatR
- Domain Events
- Repository Pattern
- Result Pattern

**Best For:**
- Enterprise applications
- Complex domain logic
- Long-term maintainability
- Team projects with clear boundaries

### Layered Architecture Agent

**Specializations:**
- Traditional n-tier architecture
- Service layer pattern
- Repository pattern
- DTO mapping

**Best For:**
- Standard business applications
- Teams familiar with traditional patterns
- CRUD-heavy applications
- Simple to medium complexity

### Vertical Slice Agent

**Specializations:**
- Feature-first organization
- CQRS with MediatR
- Minimal APIs
- Feature isolation

**Best For:**
- Rapid development
- Microservices
- Feature-focused teams
- Modern API development

## 💡 Pro Tips

### 1. Use AI Chat for Complex Scenarios

```
Generate a multi-entity feature with relationships:
- Product (Name, Price, CategoryId)
- Category (Name, Description)
- Include foreign key relationships
- Generate migration
- Add filtering and sorting to list queries
```

### 2. Combine Snippets for Quick Scaffolding

1. Type `clean-command` → Create command
2. Type `clean-validator` → Add validation
3. Type `xunit-test` → Add tests

### 3. Analyze Existing Patterns

```json
{
  "tool": "analyze_architecture_patterns",
  "args": {
    "architecture": "VerticalSlice"
  }
}
```

### 4. Use Context-Aware Generation

The AI agents automatically:
- Follow your naming conventions
- Match your coding style
- Use existing patterns
- Maintain consistency

## 🔧 Configuration

### Customize AI Agents

Edit `.aitk/agents/{architecture}-agent.json`:

```json
{
  "model": {
    "temperature": 0.3,  // Lower = more consistent
    "maxTokens": 4000
  },
  "systemPrompt": "Your custom instructions..."
}
```

### Customize MCP Server

Edit `.aitk/mcp/servers/architecture-server.js`:

```javascript
// Add custom code generation logic
generateCustomPattern(args) {
  // Your implementation
}
```

### Customize Snippets

Edit `.vscode/dotnet-architecture.code-snippets`:

```json
{
  "My Custom Snippet": {
    "prefix": "my-snippet",
    "body": ["// Your code"],
    "description": "Description"
  }
}
```

## 🐛 Troubleshooting

### MCP Server Not Starting

```powershell
# Check Node.js version
node --version  # Should be >= 18.0.0

# Reinstall dependencies
cd .aitk/mcp
Remove-Item -Recurse -Force node_modules
npm install
```

### AI Agent Not Responding

1. Check AI Toolkit extension is installed
2. Verify `.vscode/aitk.json` exists
3. Restart VS Code
4. Check Output panel → AI Toolkit

### Code Generation Issues

1. Use `analyze_architecture_patterns` to learn from existing code
2. Provide more specific property types
3. Check that target directories exist
4. Review generated code before committing

### Snippets Not Working

1. Verify `.vscode/dotnet-architecture.code-snippets` exists
2. File must be in `.vscode` folder (workspace-specific)
3. Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"

## 📚 Additional Resources

### Example Prompts

**Clean Architecture:**
```
Generate a User authentication feature with:
- Commands: Register, Login, ResetPassword, ChangePassword
- Queries: GetUserProfile, GetUserByEmail
- Include password hashing service
- Add JWT token generation
- Include comprehensive validation
- Generate integration tests with in-memory database
```

**Layered Architecture:**
```
Create an Invoice management system with:
- Entity: Invoice (InvoiceNumber, CustomerName, InvoiceDate, DueDate, TotalAmount, Status)
- Service methods: CreateInvoice, GetInvoice, UpdateInvoice, DeleteInvoice, GetOverdueInvoices
- Include business logic for calculating due dates
- Add validation for invoice numbers
- Generate repository with custom queries
```

**Vertical Slice:**
```
Build a Task management feature with:
- Operations: CreateTask, AssignTask, CompleteTask, GetTask, ListTasks
- Include filtering by status and assignee
- Use Minimal APIs with route groups
- Add request/response DTOs
- Include feature tests
```

### VS Code Commands

```
Ctrl+Shift+P → AI Toolkit: Chat
Ctrl+Shift+P → AI Toolkit: Generate Code
Ctrl+Shift+P → AI Toolkit: Analyze Code
```

### Learning Path

1. **Start with Snippets** - Learn syntax and patterns
2. **Use Single Operations** - Generate individual commands/queries
3. **Full Feature Generation** - Let AI create complete features
4. **Customize & Extend** - Modify generated code for your needs
5. **Pattern Analysis** - Learn from your codebase

## 🎯 Best Practices

1. **Review Generated Code** - Always review before committing
2. **Start Small** - Generate single operations first
3. **Use Validation** - Always include validators
4. **Write Tests** - Generate tests alongside features
5. **Follow Conventions** - Let AI learn from existing code
6. **Iterate** - Refine prompts for better results
7. **Document Custom Patterns** - Add to system prompts

## 📞 Support

- Check examples in `.aitk/examples/`
- Review AI Toolkit documentation
- Analyze existing generated code
- Experiment with different prompts

---

**Happy Coding! 🚀**

Generated features follow industry best practices and are production-ready starting points.
