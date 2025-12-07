# Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Folder Structure](#folder-structure)
3. [Technology Choices](#technology-choices)
4. [API Descriptions](#api-descriptions)
5. [Database Schema](#database-schema)
6. [Design Patterns](#design-patterns)
7. [Security Considerations](#security-considerations)
8. [Performance Optimizations](#performance-optimizations)
9. [Assumptions and Constraints](#assumptions-and-constraints)

---

## 1. Architecture Overview

### System Architecture

The application follows a **three-tier layered architecture**:

```
┌─────────────────────────────────────────┐
│           Frontend (Next.js)            │
│  - React Components                     │
│  - Client-side State Management         │
│  - API Integration                      │
└──────────────────┬──────────────────────┘
                   │ HTTP/REST
┌──────────────────▼──────────────────────┐
│         Backend API (Express.js)        │
│  ┌────────────────────────────────────┐ │
│  │  Controller Layer                  │ │
│  │  - Request Handling                │ │
│  │  - Response Formatting             │ │
│  └──────────────┬─────────────────────┘ │
│  ┌──────────────▼─────────────────────┐ │
│  │  Service Layer                     │ │
│  │  - Business Logic                  │ │
│  │  - Validation (Zod)                │ │
│  └──────────────┬─────────────────────┘ │
│  ┌──────────────▼─────────────────────┐ │
│  │  Repository Layer                  │ │
│  │  - Data Access                     │ │
│  │  - SQL Queries                     │ │
│  └──────────────┬─────────────────────┘ │
└─────────────────┼─────────────────────┘
                  │ pg (node-postgres)
┌─────────────────▼─────────────────────┐
│      PostgreSQL Database              │
│  - Persistent Storage                 │
│  - Relational Data                    │
└───────────────────────────────────────┘
```

### Request Flow

1. **Client Request**: User interacts with Next.js frontend
2. **HTTP Request**: Frontend sends REST API request to backend
3. **Controller**: Receives request, validates basic parameters
4. **Service**: Validates data with Zod, applies business logic
5. **Repository**: Executes SQL queries against PostgreSQL
6. **Response**: Data flows back through layers to client

### Key Benefits of This Architecture

- **Separation of Concerns**: Each layer has a distinct responsibility
- **Testability**: Layers can be tested independently
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Layers can be scaled independently
- **Reusability**: Services and repositories can be reused

---

## 2. Folder Structure

### Backend Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   └── database.js      # PostgreSQL connection pool setup
│   │
│   ├── controllers/         # HTTP request handlers
│   │   └── agentController.js
│   │       - createAgent()  # POST /agents
│   │       - getAllAgents() # GET /agents
│   │       - searchAgents() # GET /agents/search
│   │
│   ├── database/            # Database scripts
│   │   ├── schema.sql       # DDL for tables and indexes
│   │   ├── init.js          # Schema initialization script
│   │   └── seed.js          # Sample data population
│   │
│   ├── middleware/          # Express middleware
│   │   └── errorHandler.js
│   │       - errorHandler()      # Global error handler
│   │       - notFoundHandler()   # 404 handler
│   │
│   ├── repositories/        # Data access layer
│   │   └── agentRepository.js
│   │       - createAgent()       # Insert agent
│   │       - getAllAgents()      # Select all
│   │       - searchAgents()      # Search with filters
│   │       - getAgentById()      # Select by ID
│   │
│   ├── routes/              # API route definitions
│   │   └── agentRoutes.js   # Express router for /agents
│   │
│   ├── services/            # Business logic layer
│   │   └── agentService.js
│   │       - createAgent()       # Validate and create
│   │       - getAllAgents()      # Retrieve all
│   │       - searchAgents()      # Validate and search
│   │       - getAgentById()      # Retrieve by ID
│   │
│   ├── swagger/             # API documentation
│   │   └── swagger.json     # OpenAPI 3.0 specification
│   │
│   └── server.js            # Application entry point
│       - Express setup
│       - Middleware configuration
│       - Route mounting
│       - Server initialization
│
├── .env           # Environment variables template
├── .gitignore
├── package.json
└── postman_collection.json  # API testing collection
```

### Frontend Structure

```
frontend/
├── src/
│   └── app/
        │── component/  
        │    └── AddAgentModal.js
        │    └── AgentCard.js
        │    └── AgentModal.js
        │    └── SearchForm.js  
        ├── constants.js  
        |
│       ├── globals.css      # Global styles
│       │
│       ├── layout.js        # Root layout component
│       │
│       └── page.js          # Main application page
│
├── .env       # Environment variables template
├── .gitignore
├── next.config.js           # Next.js configuration
└── package.json
```

---

## 3. Technology Choices

### Backend Technologies

#### Node.js + Express.js
**Why chosen:**
- **Mature ecosystem**: Extensive library support
- **Performance**: Event-driven, non-blocking I/O
- **JavaScript**: Full-stack JavaScript consistency
- **RESTful APIs**: Express is ideal for REST APIs
- **Middleware support**: Easy to add authentication, logging, etc.


#### No ORM (Raw SQL with pg)
**Why chosen:**
- **Performance**: Direct SQL is faster than ORM abstractions
- **Control**: Full control over queries and optimizations
- **Transparency**: Easier to debug and understand queries

**Note**: For larger projects, Prisma would be recommended for type safety and migrations.

## 4. API Descriptions

### Design Principles

1. **RESTful conventions**: Standard HTTP methods and status codes
2. **Consistent responses**: All responses follow the same structure
3. **Error handling**: Descriptive error messages
4. **Validation**: Input validation on all endpoints
5. **Documentation**: Comprehensive Swagger documentation

### Response Format

All API responses follow this structure:

```typescript
{
  success: boolean,      // Indicates if request succeeded
  data?: any,           // Response payload (on success)
  error?: string,       // Error type (on failure)
  message?: string,     // Human-readable message
  details?: any,        // Additional information
  count?: number        // Number of items (for lists)
}
```

### Endpoints Detail

#### POST /agents
**Purpose**: Create a new real estate agent

**Authentication**: None (public endpoint)

**Request Body**:
```json
{
  "name": "string (required, 1-255 chars)",
  "photo_url": "string (optional, valid URL)",
  "specialization": "string (optional, max 255 chars)",
  "location_city": "string (optional, max 100 chars)",
  "location_state": "string (optional, max 100 chars)",
  "description": "string (optional, any length)"
}
```

**Validation Rules**:
- `name` is required and cannot be empty

**Success Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "photo_url": "...",
    "specialization": "Residential",
    "location_city": "New York",
    "location_state": "NY",
    "description": "...",
    "created_at": "2025-12-07T10:38:44.000Z"
  },
  "message": "Agent created successfully"
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    {
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```

#### GET /agents
**Purpose**: Retrieve all agents

**Query Parameters**: None

**Success Response (200)**:
```json
{
  "success": true,
  "data": [...], // Array of agent objects
  "count": 12
}
```

**Use Cases**:
- Display all agents in admin panel
- Get full agent directory
- Export agent data

#### GET /agents/search
**Purpose**: Search agents with filters

**Query Parameters**:
- `name` (required): Partial name search, case-insensitive
- `location_city` (optional): Exact city match, case-insensitive
- `specialization` (optional): Exact specialization match, case-insensitive

**Search Behavior**:
- `name`: Uses LIKE with wildcards (`%name%`)
- `location_city`: Exact match (case-insensitive)
- `specialization`: Exact match (case-insensitive)
- Multiple filters are combined with AND logic

**Examples**:

Search by name only:
```
GET /agents/search?name=john
```

Search by name and city:
```
GET /agents/search?name=john&location_city=new york
```

Search with all filters:
```
GET /agents/search?name=john&location_city=new york&specialization=residential
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": [...],
  "count": 2,
  "filters": {
    "name": "john",
    "location_city": "new york",
    "specialization": "residential"
  }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    {
      "field": "name",
      "message": "Name is required for search"
    }
  ]
}
```

---

## 5. Database Schema

### Tables

#### agents

```sql
CREATE TABLE agents (
    id SERIAL PRIMARY KEY,           -- Auto-incrementing ID
    name VARCHAR(255) NOT NULL,      -- Agent full name
    photo_url VARCHAR(500),          -- Profile photo URL
    specialization VARCHAR(255),     -- e.g., Residential, Commercial
    location_city VARCHAR(100),      -- Operating city
    location_state VARCHAR(100),     -- Operating state
    description TEXT,                -- Agent bio/description
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes

Performance-optimized indexes:

```sql
-- Individual column indexes
CREATE INDEX idx_agents_name ON agents(name);
CREATE INDEX idx_agents_location_city ON agents(location_city);
CREATE INDEX idx_agents_specialization ON agents(specialization);
CREATE INDEX idx_agents_created_at ON agents(created_at DESC);

-- Composite index for common search patterns
CREATE INDEX idx_agents_search ON agents(name, location_city, specialization);
```

**Index Strategy**:
- Single-column indexes for individual filters
- Composite index for multi-filter searches
- Descending index on `created_at` for recent-first sorting

**Why These Indexes**:
1. `idx_agents_name`: Speeds up name searches (most common)
2. `idx_agents_location_city`: City filter optimization
3. `idx_agents_specialization`: Specialization filter optimization
4. `idx_agents_created_at`: Latest agents first
5. `idx_agents_search`: Composite for multi-filter queries


### Relationships

Currently, the schema has a single table. Future expansions could include:


---

## 6. Design Patterns

### Repository Pattern

**Purpose**: Abstracts data access logic from business logic

**Implementation**:
```javascript
// Repository handles SQL queries
class AgentRepository {
  async createAgent(agent) {
    const query = `INSERT INTO agents (...) VALUES (...)`;
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}
```

**Benefits**:
- Database logic is isolated
- Easy to switch databases

### Service Pattern

**Purpose**: Encapsulates business logic and validation

**Implementation**:
```javascript
// Service handles validation and business rules
class AgentService {
  async createAgent(agentData) {
    const validatedData = createAgentSchema.parse(agentData);
    return await agentRepository.createAgent(validatedData);
  }
}
```

**Benefits**:
- Business logic is separate from HTTP concerns
- Reusable across different interfaces (REST, GraphQL, etc.)

### Controller Pattern

**Purpose**: Handles HTTP requests and responses

**Implementation**:
```javascript
// Controller handles HTTP specifics
class AgentController {
  async createAgent(req, res, next) {
    try {
      const agent = await agentService.createAgent(req.body);
      res.status(201).json({ success: true, data: agent });
    } catch (error) {
      next(error);
    }
  }
}
```

**Benefits**:
- HTTP concerns are isolated
- Easy to add new endpoints
- Consistent error handling

### Singleton Pattern

**Used for**: Database connection pool, repositories, services

**Implementation**:
```javascript
// Export single instance
export default new AgentRepository();
```

**Benefits**:
- Single database connection pool
- Reduced memory usage
- Consistent state

---

## 7. Security Considerations

### SQL Injection Prevention

**Approach**: Parameterized queries

```javascript
// ✅ SAFE - Parameterized query
pool.query(
  'SELECT * FROM agents WHERE name = $1',
  [userInput]
);

// ❌ UNSAFE - String concatenation
pool.query(
  `SELECT * FROM agents WHERE name = '${userInput}'`
);
```

**Why**: Parameters are escaped by the database driver.

### Input Validation

**Approach**: Zod schemas

```javascript
const schema = z.object({
  name: z.string().min(1).max(255),
  photo_url: z.string().url().optional()
});

// Throws error if validation fails
const validated = schema.parse(input);
```

**What's validated**:
- Data types
- String lengths
- URL formats
- Required fields

### Error Messages

**Approach**: Sanitized error responses

```javascript
// Development: Detailed errors
{ error: "Database connection failed", details: err.stack }

// Production: Generic errors
{ error: "Internal Server Error", message: "An error occurred" }
```

**Why**: Prevents information leakage in production.

## 8. Performance Optimizations

### Database Level

1. **Connection Pooling**
   ```javascript
   const pool = new Pool({
     max: 20, // 20 concurrent connections
     idleTimeoutMillis: 30000,
     connectionTimeoutMillis: 10000
   });
   ```
   **Benefit**: Reuses connections, reduces overhead

2. **Indexes**
   - Covering index for search queries
   - Reduces query time from O(n) to O(log n)

3. **Query Optimization**
   - Select only needed columns
   - Use parameterized queries (prepared statements)

## 9. Assumptions

### Assumptions

1. **Single Tenant**: No multi-tenancy required
2. **Public Access**: All endpoints are public (no authentication)
3. **Read-Heavy**: More searches than creates
4. **Small Dataset**: Pagination not required initially
7. **Stable Schema**: No migrations

### Scalability Considerations

**Current Limitations**:
- No horizontal scaling
- Single database instance
- No caching layer
- No CDN

**Scaling Plan**:
1. Add Redis caching
2. Implement load balancer (Nginx)
3. Database read replicas
4. CDN for static assets
5. Microservices architecture


## Summary

This application demonstrates:
- ✅ Clean architecture with separation of concerns
- ✅ RESTful API design principles
- ✅ Database optimization with indexes
- ✅ Input validation and error handling
- ✅ Modern frontend with React/Next.js
- ✅ Comprehensive documentation
- ✅ Production-ready deployment guides

The architecture is designed to be:
- **Maintainable**: Clear structure and patterns
- **Scalable**: Can grow with additional features
- **Secure**: Input validation and SQL injection prevention
- **Performant**: Optimized queries and indexes

