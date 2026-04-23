import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const { method, url, body } = req;
    const startTime = Date.now();

    this.logger.log(`req: ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;

        this.logger.log(`res: ${method} ${url} - ${duration}ms`);

        if (Object.keys(body || {}).length) {
          this.logger.debug(`Body: ${JSON.stringify(body)}`);
        }
      }),
    );
  }
}
