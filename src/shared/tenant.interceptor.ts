import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.headers['x-tenant-id'] || request.query.tenantId;
    
    console.log('TenantInterceptor - Headers:', request.headers);
    console.log('TenantInterceptor - Extracted tenantId:', tenantId);
    
    if (tenantId) {
      request.tenantId = parseInt(tenantId);
      console.log('TenantInterceptor - Set request.tenantId to:', request.tenantId);
    }
    
    return next.handle();
  }
}
