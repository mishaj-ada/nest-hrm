# Simplified RLS Usage - No More Boilerplate! 🎉

## Problem Solved!

### ❌ Before (Repetitive):
```typescript
@Get('employees')
async getEmployees(@Headers('x-tenant-id') tenantId: string) {
  return this.prisma.withTenant(parseInt(tenantId), async (tx) => {
    return tx.employee.findMany();
  });
}
```

### ✅ After (Clean):
```typescript
@Get('employees')
async getEmployees() {
  return this.prisma.employee.findMany();
}
```

## How It Works

### 1. TenantAwarePrismaService
- **Request-scoped**: New instance per HTTP request
- **Auto-extracts tenant**: From `request.tenantId` (set by interceptor)
- **Auto-wraps queries**: Every query automatically sets RLS context

### 2. Setup (One Time)

#### Add to Module:
```typescript
import { TenantAwarePrismaService } from '../shared/tenant-aware.service';

@Module({
  controllers: [YourController],
  providers: [TenantAwarePrismaService],
})
export class YourModule {}
```

#### Use in Controller:
```typescript
import { TenantAwarePrismaService } from '../shared/tenant-aware.service';

@Controller('hrm')
@UseInterceptors(TenantInterceptor) // Still need this for header extraction
export class HrmController {
  constructor(private prisma: TenantAwarePrismaService) {}
  
  // Now use prisma normally!
}
```

### 3. Usage Examples

#### GET All:
```typescript
@Get('employees')
async getEmployees() {
  return this.prisma.employee.findMany();
  // ↑ RLS automatically applied!
}
```

#### GET One:
```typescript
@Get('employees/:id')
async getEmployee(@Param('id') id: string) {
  return this.prisma.employee.findUnique({
    where: { id: parseInt(id) }
  });
  // ↑ RLS checks if employee belongs to current tenant
}
```

#### CREATE:
```typescript
@Post('employees')
async createEmployee(@Body() data: CreateEmployeeDto) {
  return this.prisma.employee.create({
    data: {
      ...data,
      tenantId: this.request.tenantId, // Add tenant ID
    }
  });
  // ↑ RLS verifies tenant ID matches
}
```

#### UPDATE:
```typescript
@Patch('employees/:id')
async updateEmployee(@Param('id') id: string, @Body() data: any) {
  return this.prisma.employee.update({
    where: { id: parseInt(id) },
    data
  });
  // ↑ RLS ensures you can only update your tenant's employees
}
```

#### DELETE:
```typescript
@Delete('employees/:id')
async deleteEmployee(@Param('id') id: string) {
  return this.prisma.employee.delete({
    where: { id: parseInt(id) }
  });
  // ↑ RLS prevents deleting other tenant's employees
}
```

#### COUNT:
```typescript
@Get('employees/count')
async countEmployees() {
  return this.prisma.employee.count();
  // ↑ Counts only current tenant's employees
}
```

## Complete Controller Example

```typescript
import { Controller, Get, Post, Patch, Delete, Body, Param, UseInterceptors } from '@nestjs/common';
import { TenantAwarePrismaService } from '../shared/tenant-aware.service';
import { TenantInterceptor } from '../shared/tenant.interceptor';

@Controller('hrm')
@UseInterceptors(TenantInterceptor)
export class HrmController {
  constructor(private prisma: TenantAwarePrismaService) {}

  @Get('employees')
  async getAll() {
    return this.prisma.employee.findMany();
  }

  @Get('employees/:id')
  async getOne(@Param('id') id: string) {
    return this.prisma.employee.findUnique({
      where: { id: parseInt(id) }
    });
  }

  @Post('employees')
  async create(@Body() data: any) {
    return this.prisma.employee.create({ data });
  }

  @Patch('employees/:id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.prisma.employee.update({
      where: { id: parseInt(id) },
      data
    });
  }

  @Delete('employees/:id')
  async delete(@Param('id') id: string) {
    return this.prisma.employee.delete({
      where: { id: parseInt(id) }
    });
  }
}
```

## Benefits

✅ **No repetitive code**: No more `withTenant()` wrapper  
✅ **No manual headers**: Interceptor handles it  
✅ **Clean controllers**: Just write normal Prisma queries  
✅ **RLS still works**: Every query is automatically protected  
✅ **Type-safe**: Full TypeScript support  
✅ **Request-scoped**: Each request gets its own tenant context  

## How It Works Internally

```
Request → TenantInterceptor → Sets request.tenantId
                                      ↓
                          TenantAwarePrismaService (Request-scoped)
                                      ↓
                          Reads request.tenantId from constructor
                                      ↓
                          Every query wrapped in transaction
                                      ↓
                          SET LOCAL app.current_tenant_id = 'X'
                                      ↓
                          Execute query → RLS applies
```

## Testing

```bash
# Tenant 1
curl -H "x-tenant-id: 1" http://localhost:3000/hrm/employees

# Tenant 2
curl -H "x-tenant-id: 2" http://localhost:3000/hrm/employees

# Different results! RLS working! 🔒
```

## Summary

You only need:
1. Add `@UseInterceptors(TenantInterceptor)` to controller
2. Inject `TenantAwarePrismaService`
3. Write normal Prisma queries

**RLS handles the rest automatically!** 🎉
