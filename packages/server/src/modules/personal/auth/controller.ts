import { Controller, Injectable, Post, Req, Res, Get, HttpCode, Body } from "@nestjs/common";
import { AuthService } from "./service";
import RequestWithAccount from "./interfaces/RequestWithAccount";
import { Request, Response } from 'express';
import { ApiTags } from "@nestjs/swagger";
import { RegisterPayload } from "./types";
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

    @Post("sign-in")
    async signIn(@Req() req: RequestWithAccount, @Res() res: Response){
        
    }

    @Post("register")
    async register(@Body() registerPayload: RegisterPayload, @Res() res: Response) {
        return this.authService.register(registerPayload);
    }

    @Get("isLoggedIn")
    isLoggedIn(@Res() res: Response) {
        return res.send({ "Success": true, message: "Success" });
    }

    @HttpCode(200)
    @Get("logout")
    logout(@Res() res: Response) {
        res.clearCookie('refreshToken')
        return res.send();
    }

    @Post("/refresh-token")
    async RefreToken(@Req() req: Request, @Res() res: Response) {
        const rf_token = req.cookies.refresh_token;
        return await this.authService.refreshToken(rf_token);
    }
}