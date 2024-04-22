import {Request, Response} from "express";
import { getRedisDemo } from "./cache/redis";

export function handlerRoot(req: Request, res: Response) {
    makeCoffee().then(data => res.send(data)).catch(error => res.send(error));
    // res.send("hello world");
}

async function makeCoffee() {
    console.log("开始制作咖啡...");
    const coffee = await getCoffee(); // 假设getCoffee是一个返回Promise的函数
    console.log("咖啡做好了:", coffee);
    return coffee
}

async function getCoffee() {
    await getRedisDemo();
    return new Promise(resolve => {
        setTimeout(() => resolve("拿铁"), 3000); // 模拟异步操作，3秒后完成
    });
}

export function addNum(num1: number, num2: number) {
    return num1 + num2
}
