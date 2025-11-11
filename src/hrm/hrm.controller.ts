import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { TenantAwarePrismaService } from '../shared/tenant-aware.service';
import { TenantInterceptor } from '../shared/tenant.interceptor';

@Controller('hrm')
@UseInterceptors(TenantInterceptor)
export class HrmController {
  constructor(private prisma: TenantAwarePrismaService) {}

  @Get('employees')
  async getEmployees() {
    return this.prisma.employee.findMany();
  }

  @Post('employees')
  async createEmployee(
    @Body()
    body: {
      employeeCode: string;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      position: string;
      salary?: number;
      hireDate: string;
      tenantId: number;
    },
  ) {
    return this.prisma.employee.create({
      data: {
        ...body,
        hireDate: new Date(body.hireDate),
      },
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
