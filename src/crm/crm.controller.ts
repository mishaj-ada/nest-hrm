import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '../shared/logger.service';
import { DatabaseService } from '../shared/database.service';

@Controller('crm')
export class CrmController {
  constructor(
    private logger: LoggerService,
    private db: DatabaseService,
  ) {}

  @Get('customers')
  getCustomers() {
    this.logger.log('CRM', 'Fetching customers');
    this.db.findAll('customers');
    return {
      module: 'CRM',
      data: [
        { id: 1, name: 'ABC Corp', email: 'abc@corp.com', status: 'Active' },
        { id: 2, name: 'XYZ Ltd', email: 'xyz@ltd.com', status: 'Pending' },
      ],
    };
  }

  @Get('leads')
  getLeads() {
    return {
      module: 'CRM',
      data: [
        { id: 1, company: 'Tech Startup', value: 50000, stage: 'Negotiation' },
      ],
    };
  }
}
