import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => ({
                message: data?.message || 'Operação realizada com sucesso',
                success: true,
                ...(data?.data !== undefined ? { data: data.data } : { data })
            }))
        )
    }    
}