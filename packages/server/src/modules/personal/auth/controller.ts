import { Controller, Injectable, Post, Req, Res, Get, HttpCode } from "@nestjs/common";
import { AuthService } from "./service";
import RequestWithAccount from "./RequestWithAccount";
import { Response } from 'express';
import { ApiTags } from "@nestjs/swagger";
@Injectable()
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("login")
    async login(@Req() req: RequestWithAccount, @Res() res: Response) {
        return res.send({ "Success": true, message: "Success" });
    }

    @Get("isLoggedIn")
    isLoggedIn(@Res() res: Response) {
        return res.send({ "Success": true, message: "Success" });
    }

    @HttpCode(200)
    @Get("logout")
    logout(@Res() res: Response) {
        return res.send();
    }
}