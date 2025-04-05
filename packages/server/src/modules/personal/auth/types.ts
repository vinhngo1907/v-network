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