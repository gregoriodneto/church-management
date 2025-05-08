import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        if (err || !user) {
            console.error('JwtGuard erro:', err || info);
            throw err || new UnauthorizedException('Token inválido');
        }
        return user;
    }
}