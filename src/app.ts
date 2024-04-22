import express from 'express';
import { initRedis, redisDemo } from "./cache/redis";
import { startKafkaConsumer } from "./kafka";
import { demo } from "./postgres"
import {Router} from "./router";

async function serveHttp() {
    await demo();
    initRedis();
    await redisDemo();
    const app = express();
    const port = 3000;
    Router(app);
    await startKafkaConsumer();
    app.listen(port, ()=> {
        console.log("running")
    })
}

serveHttp().catch(console.error);
