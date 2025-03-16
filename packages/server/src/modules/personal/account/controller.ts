import { Controller, Post } from '@nestjs/common';
import { AccountService } from './service';

@Controller('account')
export class AccountController {
    constructor(
        private readonly accountService: AccountService
    ) {}

    @Post("login")
    async login(){
        
    }

    @Post("register")
    async register(){
        
    }
}
