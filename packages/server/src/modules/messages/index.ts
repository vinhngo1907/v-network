import { DatabaseService } from "@modules/database/service";
import { Module, Logger } from "@nestjs/common";
import { MessagesController } from "./controller";
import { MessagesService } from "./service";

@Module({
    controllers: [MessagesController],
    providers: [DatabaseService, Logger],
    exports: [MessagesService]
})
export class MessagesModule { }