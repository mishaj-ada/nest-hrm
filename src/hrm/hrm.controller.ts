import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '../shared/logger.service';
import { DatabaseService } from '../shared/database.service';

@Controller('hrm')
export class HrmController {
  constructor(
    private logger: LoggerService,
    private db: DatabaseService,
  ) {}

  @Get('employees')
  getEmployees() {
    this.logger.log('HRM', 'Fetching employees');
    this.db.findAll('employees');
    return {
      module: 'HRM',
      data: [
        { id: 1, name: 'John Doe', position: 'Developer', salary: 5000 },
        { id: 2, name: 'Jane Smith', position: 'Manager', salary: 7000 },
      ],
    };
  }

  @Get('payroll')
  getPayroll() {
    return {
      module: 'HRM',
      data: { month: 'January', totalPayroll: 12000 },
    };
  }
}
