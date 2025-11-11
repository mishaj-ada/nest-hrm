import { Module } from '@nestjs/common';
import { HrmController } from './hrm.controller';
import { TenantAwarePrismaService } from '../shared/tenant-aware.service';

@Module({
  controllers: [HrmController],
  providers: [TenantAwarePrismaService],
})
export class HrmModule {}
