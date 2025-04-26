import { Body, Controller, Get, Injectable, InternalServerErrorException, Param, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./service";
import { LocalAuthGuard } from "../auth/guards/local";
import { JwtAuthGuard } from "../auth/guards/jwt";
import { Request, Response } from "express";

@Injectable()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }


    @Get("/:id")
    @UseGuards(JwtAuthGuard)
    async getUser(@Param("id") id: string) {
        try {
            return await this.userService.findUserById(id);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllUser(@Query("name") name: string) {
        try {
            const data = await this.userService.listUser(name);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}