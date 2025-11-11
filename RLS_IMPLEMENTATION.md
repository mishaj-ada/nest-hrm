# Row-Level Security (RLS) Implementation

## Overview
This project implements PostgreSQL Row-Level Security (RLS) to ensure complete tenant isolation at the database level.

## How It Works

### 1. Database Level (PostgreSQL RLS)
- RLS policies are enabled on `Employee` and `User` tables
- Policies filter rows based on `app.current_tenant_id` session variable
- Even `SELECT * FROM Employee` will only return rows for the current tenant

### 2. Application Level (NestJS)

#### PrismaService
- Request-scoped service that maintains tenant context
- Middleware automatically sets `app.current_tenant_id` before each query
- `withTenant()` method for explicit tenant context in transactions

#### TenantInterceptor
- Extracts tenant ID from `x-tenant-id` header or query parameter
- Automatically sets tenant context in PrismaService

## Usage

### In Controllers
```typescript
@Controller('hrm')
@UseInterceptors(TenantInterceptor)
export class HrmController {
  @Get('employees')
  async getEmployees() {
    // No need for where: { tenantId } - RLS handles it!
    return this.prisma.employee.findMany();
  }
}
```

### API Requests
```bash
# Pass tenant ID in header
curl -H "x-tenant-id: 1" http://localhost:3000/hrm/employees

# Or in query parameter
curl http://localhost:3000/hrm/employees?tenantId=1
```

### Postman Setup

#### GET Employees (Tenant 1)
- **Method**: GET
- **URL**: `http://localhost:3000/hrm/employees`
- **Headers**:
  - Key: `x-tenant-id`
  - Value: `1`

#### GET Employees (Tenant 2)
- **Method**: GET
- **URL**: `http://localhost:3000/hrm/employees`
- **Headers**:
  - Key: `x-tenant-id`
  - Value: `2`

#### POST Create Employee
- **Method**: POST
- **URL**: `http://localhost:3000/hrm/employees`
- **Headers**:
  - Key: `x-tenant-id`
  - Value: `1`
  - Key: `Content-Type`
  - Value: `application/json`
- **Body** (raw JSON):
```json
{
  "employeeCode": "TC011",
  "firstName": "Test",
  "lastName": "User",
  "email": "test@techcorp.com",
  "phone": "1234567800",
  "position": "Developer",
  "salary": 80000,
  "hireDate": "2024-01-01"
}
```

## Security Benefits
- **Database-level isolation**: Even if application code forgets to filter by tenantId, RLS prevents data leaks
- **Defense in depth**: Multiple layers of security
- **Audit compliance**: Database enforces tenant boundaries

## Migration
Run migrations to enable RLS:
```bash
npx prisma migrate deploy
```
