# RLS Workflow - Step by Step

## Complete Request Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. CLIENT REQUEST (Postman/Browser)                            │
│    GET http://localhost:3000/hrm/employees                      │
│    Header: x-tenant-id: 1                                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. NESTJS CONTROLLER                                            │
│    @UseInterceptors(TenantInterceptor) ← Intercepts here!      │
│    HrmController.getEmployees()                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. TENANT INTERCEPTOR                                           │
│    - Extracts: request.headers['x-tenant-id'] = "1"            │
│    - Calls: prisma.setTenant(1)                                 │
│    - Stores tenantId in PrismaService instance                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. CONTROLLER METHOD EXECUTES                                   │
│    return this.prisma.employee.findMany()                       │
│    ↓ No where clause! Just findMany()                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. PRISMA MIDDLEWARE (Automatic)                                │
│    - Detects query is about to execute                          │
│    - Runs: SET LOCAL app.current_tenant_id = '1'               │
│    - Sets PostgreSQL session variable                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. PRISMA GENERATES SQL                                         │
│    SELECT * FROM "Employee"                                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. POSTGRESQL DATABASE (RLS KICKS IN!)                         │
│    - Receives: SELECT * FROM "Employee"                         │
│    - RLS Policy checks: app.current_tenant_id = 1              │
│    - Automatically adds: WHERE "tenantId" = 1                   │
│    - Executes: SELECT * FROM "Employee" WHERE "tenantId" = 1   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. DATABASE RETURNS FILTERED RESULTS                            │
│    [                                                             │
│      { id: 1, firstName: "John", tenantId: 1 },                │
│      { id: 2, firstName: "Jane", tenantId: 1 },                │
│      ... only Tenant 1 employees                                │
│    ]                                                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 9. RESPONSE TO CLIENT                                           │
│    Status: 200 OK                                               │
│    Body: [...tenant 1 employees only...]                        │
└─────────────────────────────────────────────────────────────────┘
```

## Key Components

### TenantInterceptor (Step 3)
```typescript
intercept(context: ExecutionContext, next: CallHandler) {
  const tenantId = request.headers['x-tenant-id'];
  this.prisma.setTenant(parseInt(tenantId)); // Store tenant ID
  return next.handle();
}
```

### PrismaService Middleware (Step 5)
```typescript
this.$use(async (params, next) => {
  if (this.tenantId) {
    // Set PostgreSQL session variable BEFORE query
    await this.$executeRawUnsafe(
      `SET LOCAL app.current_tenant_id = '${this.tenantId}'`
    );
  }
  return next(params);
});
```

### PostgreSQL RLS Policy (Step 7)
```sql
CREATE POLICY tenant_all_policy ON "Employee"
  FOR ALL
  USING ("tenantId" = current_setting('app.current_tenant_id')::int)
  WITH CHECK ("tenantId" = current_setting('app.current_tenant_id')::int);
```

## What Happens with Different Tenant IDs?

### Request with x-tenant-id: 1
```
Query: SELECT * FROM "Employee"
RLS adds: WHERE "tenantId" = 1
Result: Only Tenant 1 employees
```

### Request with x-tenant-id: 2
```
Query: SELECT * FROM "Employee"
RLS adds: WHERE "tenantId" = 2
Result: Only Tenant 2 employees
```

### Request with NO tenant-id header
```
Query: SELECT * FROM "Employee"
RLS: No app.current_tenant_id set
Result: ERROR or empty (RLS blocks access)
```

## Security Layers

1. **Application Layer**: Interceptor extracts tenant ID
2. **ORM Layer**: Prisma sets session variable
3. **Database Layer**: PostgreSQL RLS enforces isolation

Even if someone bypasses layers 1-2, layer 3 (database) still protects data! 🔒
