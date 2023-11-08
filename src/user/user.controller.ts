import { Controller, Inject, UseGuards, Get, Post, UsePipes, Body, Param, Put, Delete, Patch, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { from, map, of, switchMap } from 'rxjs';
import { KafkaService } from 'src/kafka/kafka.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
        // @Inject('CLIENT_SERVICE') private readonly client: ClientProxy,
        // @Inject('PRODUCT_SERVICE') private readonly client1: ClientProxy
    ) { }

    @Get('/')
    @UseGuards(new AuthGuard())
    showAllUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('status') status: string = undefined,
        @Query('order_by') order_by: string = 'desc',
    ) {
        try {
            return (this.userService.showAll(page, limit, status, order_by)).pipe(
                switchMap((data) => {
                    return of({
                        msg: 'Successfully',
                        data: data,
                    });
                }),
            );
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    @Post('/register')
    @UsePipes()
    async register(
        @Body() ResponseBody: UserDTO
    ) {
        try {
            return from(await this.userService.register(ResponseBody)).pipe(
                map(data => {
                    return of({
                        msg: "Registerd in successfully",
                        data: data
                    })
                })
            );
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    @Post('/login')
    @UsePipes()
    async login(@Body() ResponseBody: UserDTO) {
        try {
            return from(await this.userService.login(ResponseBody)).pipe(
                map(data => {
                    return of({
                        data: data,
                        msg: "Logged in successfully"
                    })
                })
            )
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    @Put('/update/:id')
    @UsePipes()
    async update(
        @Param('id') id: number,
        @Body() ResponseBody: UserDTO) {
        try {
            const updatedUser = await this.userService.update(Number(id), ResponseBody);
            return updatedUser;
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    @Delete('/deletet/:id')
    @UsePipes()
    async delete(
        @Param('id') id: number
    ) {
        try {
            return this.userService.delete(Number(id))
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    @Patch('/block/:id')
    @UsePipes()
    async block(
        @Param('id') id: number
    ) {
        try {
            return this.userService.block(Number(id))
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }
}
