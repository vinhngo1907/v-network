import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../service';
import { AppConfigService } from '@config/service';
import { UserBadRequestException } from '@modules/personal/user/exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: AppConfigService
    ) {
        super({
                jwtFromRequest: ExtractJwt.fromExtractors(
                    [
                    (request: Request) => {
                        console.log("??????", request.headers["authorization"])
                        return  request.headers["authorization"];
                    },
                ]
            ),
            ignoreExpiration: false,
            secretOrKey: configService.getJwtConfig().secret,
        });
    }

    async validate(payload: any) {
        console.log("????", { payload })
        const user = await this.authService.validateJwtUser(payload);
        console.log("CHECK USER", { user })
        if (!user) {
            throw new UserBadRequestException("[TEST NE]");
        }
        return user;
    }
}
