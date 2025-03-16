import { Controller, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Kafka } from "@nestjs/microservices/external/kafka.interface";

@Controller('kafka')

export class KafkaController implements OnModuleInit {
    private readonly logger = new Logger(KafkaController.name);
    constructor(
        private configService: ConfigService,
    ) { }

    private readonly kafka: Kafka = new Kafka({
        clientId: 'user_service',
        brokers: [this.configService.get<string>('KAFKA_URI')],
        sasl: {
            mechanism: this.configService.get<string>('KAFKA_MECHANISM'),
            username: this.configService.get<string>('KAFKA_USER'),
            password: this.configService.get<string>('KAFKA_PASS'),
        } as any,
    });
    
    async onModuleInit() {
        try {

        } catch (error) {
            this.logger.error(error);
        }
    }
}
