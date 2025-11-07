import { Controller, Get, Headers, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('hrm')
export class HrmController {
  constructor(private prisma: PrismaService) {}

  @Get('employees')
  async getEmployees(@Headers('x-tenant-id') tenantId: string) {
    return this.prisma.withTenant(parseInt(tenantId), async () => {
      return this.prisma.employee.findMany();
    });
  }

  @Post('employees')
  async createEmployee(
    @Headers('x-tenant-id') tenantId: string,
    @Body() data: any,
  ) {
    return this.prisma.withTenant(parseInt(tenantId), async () => {
      return this.prisma.employee.create({
        data: {
          ...data,
          tenantId: parseInt(tenantId),
        },
      });
    });
  }

  @Get('payroll')
  getPayroll() {
    return {
      module: 'HRM',
      data: { month: 'January', totalPayroll: 12000 },
    };
  }
}
