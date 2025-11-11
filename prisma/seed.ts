import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Tenants
  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Tech Corp',
      subdomain: 'techcorp',
    },
  });

  const tenant2 = await prisma.tenant.create({
    data: {
      name: 'Business Solutions',
      subdomain: 'bizsolutions',
    },
  });

  const tenant3 = await prisma.tenant.create({
    data: {
      name: 'Global Industries',
      subdomain: 'globalind',
    },
  });

  // Create Users for each tenant
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@techcorp.com',
        password: 'password123',
        name: 'Admin Tech',
        tenantId: tenant1.id,
      },
      {
        email: 'admin@bizsolutions.com',
        password: 'password123',
        name: 'Admin Biz',
        tenantId: tenant2.id,
      },
      {
        email: 'admin@globalind.com',
        password: 'password123',
        name: 'Admin Global',
        tenantId: tenant3.id,
      },
    ],
  });

  // Create Employees for Tenant 1 (Tech Corp)
  await prisma.employee.createMany({
    data: [
      {
        employeeCode: 'TC001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@techcorp.com',
        phone: '1234567890',
        position: 'Software Engineer',
        salary: 75000,
        hireDate: new Date('2023-01-15'),
        tenantId: tenant1.id,
      },
      {
        employeeCode: 'TC002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@techcorp.com',
        phone: '1234567891',
        position: 'Senior Developer',
        salary: 95000,
        hireDate: new Date('2022-06-10'),
        tenantId: tenant1.id,
      },
      {
        employeeCode: 'TC003',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.j@techcorp.com',
        phone: '1234567892',
        position: 'DevOps Engineer',
        salary: 85000,
        hireDate: new Date('2023-03-20'),
        tenantId: tenant1.id,
      },
      {
        employeeCode: 'TC004',
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.w@techcorp.com',
        phone: '1234567893',
        position: 'Product Manager',
        salary: 105000,
        hireDate: new Date('2021-11-05'),
        tenantId: tenant1.id,
      },
      {
        employeeCode: 'TC005',
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.b@techcorp.com',
        phone: '1234567894',
        position: 'QA Engineer',
        salary: 70000,
        hireDate: new Date('2023-07-12'),
        tenantId: tenant1.id,
      },
      {
        employeeCode: 'TC006',
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.d@techcorp.com',
        phone: '1234567895',
        position: 'UI/UX Designer',
        salary: 80000,
        hireDate: new Date('2022-09-18'),
        tenantId: tenant1.id,
      },
      {
        employeeCode: 'TC007',
        firstName: 'Robert',
        lastName: 'Miller',
        email: 'robert.m@techcorp.com',
        phone: '1234567896',
        position: 'Tech Lead',
        salary: 120000,
        hireDate: new Date('2020-04-22'),
        tenantId: tenant1.id,
      },
      {
        employeeCode: 'TC008',
        firstName: 'Lisa',
        lastName: 'Wilson',
        email: 'lisa.w@techcorp.com',
        phone: '1234567897',
        position: 'Business Analyst',
        salary: 78000,
        hireDate: new Date('2023-02-14'),
        tenantId: tenant1.id,
      },
      {
        employeeCode: 'TC009',
        firstName: 'James',
        lastName: 'Moore',
        email: 'james.m@techcorp.com',
        phone: '1234567898',
        position: 'Data Engineer',
        salary: 90000,
        hireDate: new Date('2022-12-01'),
        tenantId: tenant1.id,
      },
      {
        employeeCode: 'TC010',
        firstName: 'Anna',
        lastName: 'Taylor',
        email: 'anna.t@techcorp.com',
        phone: '1234567899',
        position: 'HR Manager',
        salary: 82000,
        hireDate: new Date('2021-08-30'),
        tenantId: tenant1.id,
      },
    ],
  });

  // Create Employees for Tenant 2 (Business Solutions)
  await prisma.employee.createMany({
    data: [
      {
        employeeCode: 'BS001',
        firstName: 'Tom',
        lastName: 'Anderson',
        email: 'tom.a@bizsolutions.com',
        phone: '2234567890',
        position: 'Sales Manager',
        salary: 88000,
        hireDate: new Date('2022-03-15'),
        tenantId: tenant2.id,
      },
      {
        employeeCode: 'BS002',
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.g@bizsolutions.com',
        phone: '2234567891',
        position: 'Account Executive',
        salary: 72000,
        hireDate: new Date('2023-01-20'),
        tenantId: tenant2.id,
      },
      {
        employeeCode: 'BS003',
        firstName: 'Chris',
        lastName: 'Martinez',
        email: 'chris.m@bizsolutions.com',
        phone: '2234567892',
        position: 'Marketing Director',
        salary: 98000,
        hireDate: new Date('2021-05-10'),
        tenantId: tenant2.id,
      },
      {
        employeeCode: 'BS004',
        firstName: 'Jessica',
        lastName: 'Lee',
        email: 'jessica.l@bizsolutions.com',
        phone: '2234567893',
        position: 'Customer Success',
        salary: 65000,
        hireDate: new Date('2023-04-18'),
        tenantId: tenant2.id,
      },
      {
        employeeCode: 'BS005',
        firstName: 'Daniel',
        lastName: 'White',
        email: 'daniel.w@bizsolutions.com',
        phone: '2234567894',
        position: 'Operations Manager',
        salary: 92000,
        hireDate: new Date('2022-07-22'),
        tenantId: tenant2.id,
      },
      {
        employeeCode: 'BS006',
        firstName: 'Laura',
        lastName: 'Harris',
        email: 'laura.h@bizsolutions.com',
        phone: '2234567895',
        position: 'Finance Analyst',
        salary: 75000,
        hireDate: new Date('2023-06-05'),
        tenantId: tenant2.id,
      },
      {
        employeeCode: 'BS007',
        firstName: 'Kevin',
        lastName: 'Clark',
        email: 'kevin.c@bizsolutions.com',
        phone: '2234567896',
        position: 'Sales Representative',
        salary: 68000,
        hireDate: new Date('2023-09-12'),
        tenantId: tenant2.id,
      },
      {
        employeeCode: 'BS008',
        firstName: 'Rachel',
        lastName: 'Lewis',
        email: 'rachel.l@bizsolutions.com',
        phone: '2234567897',
        position: 'Content Writer',
        salary: 62000,
        hireDate: new Date('2023-08-01'),
        tenantId: tenant2.id,
      },
      {
        employeeCode: 'BS009',
        firstName: 'Brian',
        lastName: 'Walker',
        email: 'brian.w@bizsolutions.com',
        phone: '2234567898',
        position: 'Business Development',
        salary: 85000,
        hireDate: new Date('2022-10-15'),
        tenantId: tenant2.id,
      },
      {
        employeeCode: 'BS010',
        firstName: 'Nicole',
        lastName: 'Hall',
        email: 'nicole.h@bizsolutions.com',
        phone: '2234567899',
        position: 'Project Coordinator',
        salary: 70000,
        hireDate: new Date('2023-02-28'),
        tenantId: tenant2.id,
      },
    ],
  });

  // Create Employees for Tenant 3 (Global Industries)
  await prisma.employee.createMany({
    data: [
      {
        employeeCode: 'GI001',
        firstName: 'Steven',
        lastName: 'Young',
        email: 'steven.y@globalind.com',
        phone: '3234567890',
        position: 'Manufacturing Manager',
        salary: 95000,
        hireDate: new Date('2021-02-10'),
        tenantId: tenant3.id,
      },
      {
        employeeCode: 'GI002',
        firstName: 'Michelle',
        lastName: 'King',
        email: 'michelle.k@globalind.com',
        phone: '3234567891',
        position: 'Quality Control',
        salary: 72000,
        hireDate: new Date('2022-11-20'),
        tenantId: tenant3.id,
      },
      {
        employeeCode: 'GI003',
        firstName: 'Paul',
        lastName: 'Wright',
        email: 'paul.w@globalind.com',
        phone: '3234567892',
        position: 'Supply Chain Manager',
        salary: 98000,
        hireDate: new Date('2020-09-05'),
        tenantId: tenant3.id,
      },
      {
        employeeCode: 'GI004',
        firstName: 'Amanda',
        lastName: 'Lopez',
        email: 'amanda.l@globalind.com',
        phone: '3234567893',
        position: 'Logistics Coordinator',
        salary: 68000,
        hireDate: new Date('2023-03-15'),
        tenantId: tenant3.id,
      },
      {
        employeeCode: 'GI005',
        firstName: 'George',
        lastName: 'Hill',
        email: 'george.h@globalind.com',
        phone: '3234567894',
        position: 'Production Supervisor',
        salary: 82000,
        hireDate: new Date('2022-05-22'),
        tenantId: tenant3.id,
      },
      {
        employeeCode: 'GI006',
        firstName: 'Karen',
        lastName: 'Scott',
        email: 'karen.s@globalind.com',
        phone: '3234567895',
        position: 'Safety Officer',
        salary: 75000,
        hireDate: new Date('2023-01-08'),
        tenantId: tenant3.id,
      },
      {
        employeeCode: 'GI007',
        firstName: 'Richard',
        lastName: 'Green',
        email: 'richard.g@globalind.com',
        phone: '3234567896',
        position: 'Warehouse Manager',
        salary: 78000,
        hireDate: new Date('2022-08-12'),
        tenantId: tenant3.id,
      },
      {
        employeeCode: 'GI008',
        firstName: 'Betty',
        lastName: 'Adams',
        email: 'betty.a@globalind.com',
        phone: '3234567897',
        position: 'Procurement Specialist',
        salary: 70000,
        hireDate: new Date('2023-05-30'),
        tenantId: tenant3.id,
      },
      {
        employeeCode: 'GI009',
        firstName: 'Mark',
        lastName: 'Baker',
        email: 'mark.b@globalind.com',
        phone: '3234567898',
        position: 'Maintenance Engineer',
        salary: 85000,
        hireDate: new Date('2021-12-15'),
        tenantId: tenant3.id,
      },
      {
        employeeCode: 'GI010',
        firstName: 'Sandra',
        lastName: 'Nelson',
        email: 'sandra.n@globalind.com',
        phone: '3234567899',
        position: 'Inventory Manager',
        salary: 80000,
        hireDate: new Date('2022-04-20'),
        tenantId: tenant3.id,
      },
    ],
  });

  console.log('✅ Seed completed!');
  console.log('📊 Created:');
  console.log('  - 3 Tenants');
  console.log('  - 3 Users');
  console.log('  - 30 Employees (10 per tenant)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
