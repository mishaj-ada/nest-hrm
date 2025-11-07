import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(module: string, message: string) {
    console.log(`[${module}] ${new Date().toISOString()} - ${message}`);
  }
}
