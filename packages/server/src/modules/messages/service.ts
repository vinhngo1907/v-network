import { DatabaseService } from "@modules/database/service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessagesService {
    constructor(
        private databaseService: DatabaseService
    ){}
}