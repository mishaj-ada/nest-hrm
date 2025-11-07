import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '../shared/logger.service';
import { DatabaseService } from '../shared/database.service';

@Controller('inventory')
export class InventoryController {
  constructor(
    private logger: LoggerService,
    private db: DatabaseService,
  ) {}

  @Get('products')
  getProducts() {
    this.logger.log('Inventory', 'Fetching products');
    this.db.findAll('products');
    return {
      module: 'Inventory',
      data: [
        { id: 1, name: 'Laptop', stock: 50, price: 1000 },
        { id: 2, name: 'Mouse', stock: 200, price: 25 },
      ],
    };
  }

  @Get('stock')
  getStock() {
    return {
      module: 'Inventory',
      data: { totalItems: 250, lowStock: 5 },
    };
  }
}
