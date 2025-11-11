import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class TenantAwarePrismaService {
  private prisma: PrismaClient;
  private tenantId: number;

  constructor(@Inject(REQUEST) private request: any) {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.APP_DATABASE_URL || process.env.DATABASE_URL,
        },
      },
    });
  }

  private getTenantId(): number {
    const tenantId = this.request.tenantId;
    console.log('getTenantId called, value:', tenantId);
    return tenantId;
  }

  private async executeWithTenant<T>(operation: (tx: any) => Promise<T>): Promise<T> {
    const tenantId = this.getTenantId();
    return this.prisma.$transaction(async (tx) => {
      if (tenantId) {
        console.log('Setting tenant context:', tenantId);
        await tx.$executeRawUnsafe(
          `SET LOCAL app.current_tenant_id = '${tenantId}'`,
        );
      } else {
        console.warn('No tenantId set!');
      }
      return operation(tx);
    });
  }

  get employee() {
    const self = this;
    return {
      findMany: (args?: any) => self.executeWithTenant((tx) => tx.employee.findMany(args)),
      findUnique: (args: any) => self.executeWithTenant((tx) => tx.employee.findUnique(args)),
      findFirst: (args?: any) => self.executeWithTenant((tx) => tx.employee.findFirst(args)),
      create: (args: any) => self.executeWithTenant((tx) => tx.employee.create(args)),
      update: (args: any) => self.executeWithTenant((tx) => tx.employee.update(args)),
      delete: (args: any) => self.executeWithTenant((tx) => tx.employee.delete(args)),
      count: (args?: any) => self.executeWithTenant((tx) => tx.employee.count(args)),
    };
  }

  get user() {
    const self = this;
    return {
      findMany: (args?: any) => self.executeWithTenant((tx) => tx.user.findMany(args)),
      findUnique: (args: any) => self.executeWithTenant((tx) => tx.user.findUnique(args)),
      create: (args: any) => self.executeWithTenant((tx) => tx.user.create(args)),
      update: (args: any) => self.executeWithTenant((tx) => tx.user.update(args)),
      delete: (args: any) => self.executeWithTenant((tx) => tx.user.delete(args)),
    };
  }
}
