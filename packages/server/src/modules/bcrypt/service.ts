import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    async hashString(data: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(data, salt);
    }

    async isEqual(data: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(data, hash);
    }
}