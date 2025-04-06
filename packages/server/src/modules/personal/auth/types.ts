import { ApiProperty } from "@nestjs/swagger";

export class RegisterPayload {
    @ApiProperty()
    account: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    password: string;
}

export enum Role {
    User = "USER",
    Admin = "ADMIN",
    Supporter = "SUPPORTER",
    Mod = "MOD"
}

export interface TokenPayload {
    username: string;
    userId: string;
}