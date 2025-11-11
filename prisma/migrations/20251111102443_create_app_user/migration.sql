-- Create application user (non-superuser) for RLS to work
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'runnit_app') THEN
    CREATE USER runnit_app WITH PASSWORD 'runnit_app_secure_2024';
  END IF;
END
$$;

-- Grant necessary permissions
GRANT CONNECT ON DATABASE runnittest TO runnit_app;
GRANT USAGE ON SCHEMA public TO runnit_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO runnit_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO runnit_app;

-- Grant permissions for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO runnit_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO runnit_app;
