import { Injectable } from '@nestjs/common';
import { Producer, Consumer, Kafka } from 'kafkajs';
require('dotenv').config();

@Injectable()
export class KafkaService {
    private kafkaClient: Kafka;
    private consumer: Consumer;
    private producer: Producer;
    constructor() {
        this.kafkaClient = new Kafka({
            clientId: 'auth-microservice',
            brokers: [process.env.HOST_KAFKA],
            sasl: {
                mechanism: process.env.MECHANISM,
                username: process.env.USERNAME_KAFKA,
                password: process.env.PASSWORD_KAFKA,
            } as any
        });
        this.producer = this.kafkaClient.producer();
        this.consumer = this.kafkaClient.consumer({
            groupId: 'auth-microservice'
        })
    }
    async CheckAndCreateTopic(topic: string) {
        const admin = this.kafkaClient.admin();
        await admin.connect();
        const listTopic = await admin.listTopics();
        if (!listTopic.includes(topic)) {
            await admin.createTopics({
                topics: [{ topic: topic }]
            });
        }
        await admin.disconnect();
    }

    async SendMessage(topic: string, message: object) {
        await this.CheckAndCreateTopic(topic);
        await this.producer.connect();
        const sent = await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }]
        })
        await this.producer.disconnect();
        return sent
    }

    GetUser(groupId: string | undefined = undefined){
        if(groupId){
            return this.kafkaClient.consumer({
                groupId: groupId
            })
        }
        return this.consumer;
    }
}
