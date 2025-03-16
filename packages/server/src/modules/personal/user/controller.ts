import { Controller, Injectable } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./service";

@Injectable()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService
    ) {}
}