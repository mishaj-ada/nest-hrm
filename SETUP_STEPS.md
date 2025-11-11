# RLS Setup - Next Steps

## Run These Commands:

### 1. Apply Migrations (Creates app user + enables RLS)
```bash
npx prisma migrate deploy
```

### 2. Restart Application
```bash
npm run start:dev
```

### 3. Test with Postman

#### Test Tenant 1:
**GET** `http://localhost:3000/hrm/employees`
- Header: `x-tenant-id: 1`
- Should return only Tenant 1 employees (TC001-TC010)

#### Test Tenant 2:
**GET** `http://localhost:3000/hrm/employees`
- Header: `x-tenant-id: 2`
- Should return only Tenant 2 employees (BS001-BS010)

#### Test Tenant 3:
**GET** `http://localhost:3000/hrm/employees`
- Header: `x-tenant-id: 3`
- Should return only Tenant 3 employees (GI001-GI005)

### 4. Verify RLS is Working

Connect to database and test:
```bash
psql "postgresql://runnit_app:runnit_app_secure_2024@localhost:5433/runnittest"
```

Then run:
```sql
-- Set tenant context
SET app.current_tenant_id = '1';

-- Should only show tenant 1 employees
SELECT "employeeCode", "firstName", "tenantId" FROM "Employee";

-- Change tenant
SET app.current_tenant_id = '2';

-- Should only show tenant 2 employees
SELECT "employeeCode", "firstName", "tenantId" FROM "Employee";
```

## What Changed:

✅ Created `runnit_app` user (non-superuser)  
✅ Enabled RLS on `Employee` and `User` tables  
✅ App now uses `APP_DATABASE_URL` for runtime  
✅ Migrations still use `DATABASE_URL` (superuser)  

## Done! 🎉

Your multi-tenant app now has database-level isolation with RLS!
