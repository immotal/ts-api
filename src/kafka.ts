import { Kafka } from 'kafkajs';

export async function startKafkaConsumer() {
    const kafka = new Kafka({
        brokers: ['kafka.tencent:9092'],
    });

    const consumer = kafka.consumer({ groupId: 'test-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });
            // 在这里处理消费消息的逻辑，比如将消息存入数据库或者进行其他处理
        },
    });
}
