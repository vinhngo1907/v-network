import { Controller, Injectable, Post, Req, Res, Get, HttpCode, Body, UseGuards, HttpStatus } from "@nestjs/common";
import { AuthService } from "./service";
import RequestWithAccount from "./interfaces/RequestWithAccount";
import { Request, Response } from 'express';
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginPayload, RegisterPayload } from "./types";
import { LocalAuthGuard } from "./guards/local";
import { Public } from "./decorator";
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

    @HttpCode(200)
    @ApiBody({
        type: LoginPayload,
    })
    @Public()
    // @UseGuards(LocalAuthGuard)
    @Post("signin")
    async signIn(@Body() payload: { account: string, password: string }, @Res() res: Response) {
        try {
            const data = await this.authService.signIn(payload, res);
            return res.status(200).json({ "Success": true, data, message: "Signin in successfully!", error: null });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ "Success": false, data: null, error: error.message });
        }
    }

    @Post("register")
    async register(@Body() registerPayload): Promise<any> {
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
        res.clearCookie('refreshToken');
        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            data: null
        };
    }

    @Post("/refresh-token")
    async RefreToken(@Req() req: Request, @Res() res: Response) {
        const rf_token = req.cookies.refresh_token;
        return await this.authService.refreshToken(rf_token);
    }
}