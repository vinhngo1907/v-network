import { ApiProperty } from "@nestjs/swagger";

export class RegisterPayload {
    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    password: string;
}