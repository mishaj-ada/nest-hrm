import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [LoggerService, DatabaseService],
  exports: [LoggerService, DatabaseService],
})
export class SharedModule {}
