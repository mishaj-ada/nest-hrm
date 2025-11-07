import { Module } from '@nestjs/common';
import { HrmController } from './hrm.controller';

@Module({
  controllers: [HrmController],
})
export class HrmModule {}
