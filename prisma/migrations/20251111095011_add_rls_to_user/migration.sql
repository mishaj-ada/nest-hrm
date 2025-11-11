-- Enable RLS on User table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Create policy for User table
CREATE POLICY tenant_user_policy ON "User"
  FOR ALL
  USING ("tenantId" = current_setting('app.current_tenant_id')::int)
  WITH CHECK ("tenantId" = current_setting('app.current_tenant_id')::int);
