import { MessagesService } from "@modules/messages/service";
import { Controller, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Kafka, Producer, Consumer, KafkaMessage } from "@nestjs/microservices/external/kafka.interface";
// import { Kafka, Producer, Consumer, KafkaMessage } from "kafkajs";

@Controller('kafka')

export class KafkaController implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(KafkaController.name);
    constructor(
        private configService: ConfigService,
		private messagesService: MessagesService,
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

    private readonly producer: Producer = this.kafka.producer();

	private readonly consumer: Consumer = this.kafka.consumer({
		groupId: this.configService.get<string>('KAFKA_RAW_MESSAGE_GROUP'),
	});

    async onModuleInit() {
        try {

        } catch (error) {
            this.logger.error(error);
        }
    }

    async onModuleDestroy() {
		try {
			await this.producer.disconnect();
			await this.consumer.disconnect();
			// await this.analysisConsumer.disconnect();
		} catch (error) {
			this.logger.error(error);
		}
	}
}
