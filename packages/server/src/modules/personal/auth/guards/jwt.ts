import { ExecutionContext, Injectable, UnauthorizedException, } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../decorator";
import { JwtService } from "@nestjs/jwt";
import { AppConfigService } from "@config/service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private appConfigService: AppConfigService
    ) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        // console.log("??????", { token })
        if (!token) {
            throw new UnauthorizedException("Invalid Authentication");
        }
        try {
            const { secret, signOptions } = this.appConfigService.getJwtConfig()
            const decoded = this.jwtService.verify(token, {
                secret,
            });
            // console.log(">>>>>>", { decoded });
            if (!decoded) {
                throw new UnauthorizedException("Invalid Authentication");
            }

            request['user'] = decoded;
            // return super.canActivate(context);
            // console.log("CHu ba bi bo nha nho", request['user'])
        } catch (error) {
            throw new UnauthorizedException(error);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers['authorization'] || request.headers['Authorization'];
        if (typeof authHeader === 'string') {
            const [type, token] = authHeader.split(' ');
            if (type === 'Bearer') {
                return token;
            }
        }

        return undefined;
    }
}