# AI Toolkit & MCP Example Prompts

## Clean Architecture Examples

### Example 1: Basic CRUD Feature

**Prompt:**
```
Generate a Product feature with Clean Architecture:
- Properties: Name (string, required), Description (string), Price (decimal, required), SKU (string, required, unique)
- Operations: Create, Read, Update, Delete, List
- Include validation
- Include unit tests
```

### Example 2: Complex Feature with Relationships

**Prompt:**
```
Generate an Order feature with Clean Architecture:
- Properties: OrderNumber, OrderDate, CustomerId, TotalAmount, Status
- Related entities: OrderItem (ProductId, Quantity, UnitPrice, Subtotal)
- Operations: Create order with items, Get order with items, Update order status, Cancel order, List orders by customer
- Include domain events: OrderCreated, OrderStatusChanged, OrderCancelled
- Include aggregate root pattern
- Include repository with specifications
- Include unit and integration tests
```

### Example 3: Authentication Feature

**Prompt:**
```
Generate User authentication feature with Clean Architecture:
- Commands: RegisterUser, LoginUser, ResetPassword, ChangePassword, RefreshToken
- Queries: GetUserProfile, GetUserByEmail, ValidateToken
- Include password hashing service interface
- Include JWT token generation
- Include email verification flow
- Include validation for email format, password strength
- Include unit tests with mocked dependencies
```

## Layered Architecture Examples

### Example 1: Simple Service

**Prompt:**
```
Generate a Customer service with Layered Architecture:
- Properties: FirstName, LastName, Email, Phone, Address
- Service methods: Create, Read, Update, Delete, GetAll, SearchByEmail
- Include repository interface and implementation
- Include DTO classes
- Include validation
- Include unit tests for service layer
```

### Example 2: Business Logic Heavy

**Prompt:**
```
Generate an Invoice service with Layered Architecture:
- Properties: InvoiceNumber, InvoiceDate, DueDate, CustomerId, TotalAmount, PaidAmount, Status
- Business rules:
  - Calculate due date as 30 days from invoice date
  - Automatically mark as overdue when past due date
  - Calculate balance (TotalAmount - PaidAmount)
  - Only allow payment if status is not Cancelled
- Service methods: CreateInvoice, RecordPayment, CancelInvoice, GetOverdueInvoices, GetCustomerInvoices
- Include repository with custom queries
- Include DTOs for requests and responses
- Include business validation
- Include unit tests
```

### Example 3: Integration with External API

**Prompt:**
```
Generate a Payment service with Layered Architecture:
- Properties: TransactionId, Amount, Currency, PaymentMethod, Status, CreatedAt
- Service methods: ProcessPayment, RefundPayment, GetPaymentStatus, GetPaymentHistory
- Include interface for external payment gateway
- Include retry logic for failed payments
- Include logging for all operations
- Include error handling for external service failures
- Include unit tests with mocked external service
```

## Vertical Slice Examples

### Example 1: Feature with Filtering

**Prompt:**
```
Generate a Task management feature with Vertical Slice Architecture:
- Properties: Title, Description, AssignedTo, DueDate, Status, Priority
- Operations:
  - CreateTask
  - AssignTask (change assignee)
  - UpdateTaskStatus
  - CompleteTask
  - GetTask
  - ListTasks (with filters: status, assignee, priority, due date range)
- Use Minimal APIs with route groups
- Include validation for all commands
- Include pagination for list query
- Include feature tests
```

### Example 2: Event-Driven Feature

**Prompt:**
```
Generate a Notification feature with Vertical Slice Architecture:
- Operations:
  - SendEmail (command)
  - SendSMS (command)
  - GetNotificationHistory (query)
  - MarkAsRead (command)
- Include notification templates
- Include queuing mechanism (background processing)
- Include retry logic for failed notifications
- Use Minimal APIs
- Include validation
- Include feature tests
```

### Example 3: Search and Filter Feature

**Prompt:**
```
Generate a Product Search feature with Vertical Slice Architecture:
- Operations:
  - SearchProducts (query with full-text search)
  - FilterProducts (by category, price range, brand, rating)
  - SortProducts (by price, rating, date, popularity)
  - GetProductDetails (query)
- Include pagination
- Include caching for frequently accessed products
- Use Minimal APIs
- Include response DTOs with proper serialization
- Include feature tests
```

## MCP Tool Usage Examples

### Using generate_clean_feature

```json
{
  "tool": "generate_clean_feature",
  "args": {
    "featureName": "Product",
    "entityProperties": [
      {
        "name": "Name",
        "type": "string",
        "isRequired": true,
        "isValueObject": false
      },
      {
        "name": "Description",
        "type": "string",
        "isRequired": false,
        "isValueObject": false
      },
      {
        "name": "Price",
        "type": "decimal",
        "isRequired": true,
        "isValueObject": false
      },
      {
        "name": "SKU",
        "type": "string",
        "isRequired": true,
        "isValueObject": false
      }
    ],
    "operations": ["Create", "Read", "Update", "Delete", "List"],
    "includeDomainEvents": true,
    "includeValidation": true,
    "includeTests": true
  }
}
```

### Using generate_layered_feature

```json
{
  "tool": "generate_layered_feature",
  "args": {
    "featureName": "Order",
    "entityProperties": [
      {
        "name": "OrderNumber",
        "type": "string",
        "isRequired": true
      },
      {
        "name": "OrderDate",
        "type": "DateTime",
        "isRequired": true
      },
      {
        "name": "CustomerId",
        "type": "int",
        "isRequired": true
      },
      {
        "name": "TotalAmount",
        "type": "decimal",
        "isRequired": true
      },
      {
        "name": "Status",
        "type": "string",
        "isRequired": true
      }
    ],
    "operations": ["Create", "Read", "Update", "Delete", "List"],
    "includeValidation": true,
    "includeTests": true
  }
}
```

### Using generate_vertical_slice

```json
{
  "tool": "generate_vertical_slice",
  "args": {
    "featureName": "Customer",
    "entityProperties": [
      {
        "name": "FirstName",
        "type": "string",
        "isRequired": true
      },
      {
        "name": "LastName",
        "type": "string",
        "isRequired": true
      },
      {
        "name": "Email",
        "type": "string",
        "isRequired": true
      },
      {
        "name": "Phone",
        "type": "string",
        "isRequired": false
      }
    ],
    "operations": ["Create", "Read", "Update", "Delete", "List"],
    "useMinimalApis": true,
    "includeValidation": true,
    "includeTests": true
  }
}
```

### Using analyze_architecture_patterns

```json
{
  "tool": "analyze_architecture_patterns",
  "args": {
    "architecture": "VerticalSlice"
  }
}
```

## Advanced Scenarios

### Multi-Step Feature Generation

**Step 1: Generate Core Feature**
```
Generate a Blog Post feature with Clean Architecture:
- Properties: Title, Content, AuthorId, PublishedDate, Status
- Operations: Create, Read, Update, Delete, List, Publish, Unpublish
- Include domain events
```

**Step 2: Add Related Features**
```
Add Comment feature related to Blog Post:
- Properties: PostId, AuthorId, Content, CreatedAt
- Operations: AddComment, GetCommentsByPost, DeleteComment, ModerateComment
- Include validation
```

**Step 3: Add Search**
```
Add search capability to Blog Posts:
- Query: SearchPosts with filters (author, date range, status, tags)
- Include full-text search
- Include pagination and sorting
```

### Refactoring Existing Code

**Prompt:**
```
Analyze the existing Product controller and refactor to Vertical Slice Architecture:
- Extract each endpoint into separate command/query
- Create handlers for each operation
- Add validation
- Generate feature tests
- Maintain existing API contracts
```

### Generate with Custom Patterns

**Prompt:**
```
Generate an Inventory feature with custom specifications:
- Use CQRS with separate read and write models
- Implement event sourcing for all state changes
- Include snapshot mechanism every 10 events
- Add projection for inventory reports
- Include reconciliation command
- Generate unit tests with event store mock
```

## Testing Examples

### Generate Comprehensive Tests

**Prompt:**
```
Generate complete test suite for Product feature:
- Unit tests for all handlers
- Unit tests for validators
- Unit tests for domain entity
- Integration tests for API endpoints
- Integration tests with in-memory database
- Mock external dependencies
- Use FluentAssertions
- Include test data builders
```

### Generate Performance Tests

**Prompt:**
```
Generate performance tests for Order feature:
- Test bulk order creation (1000 orders)
- Test concurrent order updates
- Test query performance with large datasets
- Include setup for test data
- Include teardown
```

---

**Tips:**
- Be specific about property types and requirements
- Mention validation rules explicitly
- Specify if you need domain events
- Request specific test scenarios
- Indicate if you need pagination, filtering, or sorting
- Mention any external dependencies or integrations
