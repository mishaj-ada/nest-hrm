-- Enable RLS on Employee table
ALTER TABLE "Employee" ENABLE ROW LEVEL SECURITY;

-- Create policy: only show employees for current tenant
CREATE POLICY tenant_isolation_policy ON "Employee"
  USING ("tenantId" = current_setting('app.current_tenant_id')::int);

-- Allow all operations for authenticated users
CREATE POLICY tenant_all_policy ON "Employee"
  FOR ALL
  USING ("tenantId" = current_setting('app.current_tenant_id')::int)
  WITH CHECK ("tenantId" = current_setting('app.current_tenant_id')::int);