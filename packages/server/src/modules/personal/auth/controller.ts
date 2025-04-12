import { Controller, Injectable, Post, Req, Res, Get, HttpCode, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./service";
import RequestWithAccount from "./interfaces/RequestWithAccount";
import { Request, Response } from 'express';
import { ApiTags } from "@nestjs/swagger";
import { RegisterPayload } from "./types";
import { LocalAuthGuard } from "./guards/local";
@Injectable()
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("login")
    @UseGuards(LocalAuthGuard) 
    async login(@Req() req: RequestWithAccount, @Res() res: Response) {
        return res.send({ "Success": true, message: "Success" });
    }

    @Post("signin")
    async signIn(@Body() payload: {account: string, password: string}, @Res() res: Response){
        return await this.authService.signIn(payload, res);
    }

    @Post("register")
    async register(@Body() registerPayload: RegisterPayload, @Res() res: Response) {
        return this.authService.register(registerPayload);
    }

    @Get("isLoggedIn")
    isLoggedIn(@Res() res: Response) {
        console.log("Hello Coders Tokyo")
        res.send({ "Success": true, message: "Success" });
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