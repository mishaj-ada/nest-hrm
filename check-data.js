const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('Checking database data...\n');
  
  const tenants = await prisma.tenant.findMany();
  console.log('Tenants:', tenants.length);
  tenants.forEach(t => console.log(`  - ${t.name} (ID: ${t.id})`));
  
  console.log('\nEmployees by tenant:');
  for (const tenant of tenants) {
    const count = await prisma.employee.count({
      where: { tenantId: tenant.id }
    });
    console.log(`  - Tenant ${tenant.id} (${tenant.name}): ${count} employees`);
  }
  
  console.log('\nRLS Policies:');
  const policies = await prisma.$queryRaw`
    SELECT tablename, policyname, permissive, roles, cmd, qual 
    FROM pg_policies 
    WHERE schemaname = 'public' AND tablename IN ('Employee', 'User')
  `;
  console.log(policies);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
