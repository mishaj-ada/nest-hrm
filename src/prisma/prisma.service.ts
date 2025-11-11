import { Injectable, OnModuleInit, Scope, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class PrismaService implements OnModuleInit {
  private client: any;
  private tenantId: number;

  constructor(@Inject(REQUEST) private request: any) {
    this.tenantId = request.tenantId;

    const baseClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.APP_DATABASE_URL || process.env.DATABASE_URL,
        },
      },
    });

    this.client = baseClient.$extends({
      query: {
        async $allOperations({ operation, model, args, query }) {
          if (this.tenantId) {
            await baseClient.$executeRawUnsafe(
              `SET LOCAL app.current_tenant_id = '${this.tenantId}'`,
            );
          }
          return query(args);
        },
      },
    });
  }

  async onModuleInit() {
    // Connection handled by base client
  }

  get employee() {
    return this.client.employee;
  }

  get user() {
    return this.client.user;
  }

  get tenant() {
    return this.client.tenant;
  }
}
