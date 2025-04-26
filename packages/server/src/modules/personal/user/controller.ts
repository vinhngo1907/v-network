import { Controller, Get, Injectable, InternalServerErrorException, Param, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./service";
import { LocalAuthGuard } from "../auth/guards/local";
import { JwtAuthGuard } from "../auth/guards/jwt";

@Injectable()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService
    ) {}


    @Get("/:id")
    @UseGuards(JwtAuthGuard)
    async getProfile(@Param("id") id: string){
        try {
            console.log({id})
            return await this.userService.findUserById(id);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}