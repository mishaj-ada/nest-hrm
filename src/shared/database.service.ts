import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  // Simulated common DB query
  findAll(table: string) {
    return { table, message: 'Fetching all records from database' };
  }

  findById(table: string, id: number) {
    return { table, id, message: 'Fetching record by ID' };
  }
}
