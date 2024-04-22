import { initRedisPool, getRedisClient, releaseRedisClient } from './redisPool';

// 初始化 Redis 连接池
export function initRedis() {
    initRedisPool();
}

async function setData(key: string, value: any) {
    let redisClient;
    try {
        redisClient = await getRedisClient(); // 获取 Redis 连接
        await redisClient.set(key, value); // 设置数据
        console.log(`Set data successfully for key: ${key}`);
    } catch (error) {
        console.error('Error setting data:', error);
    } finally {
        if (redisClient) {
            releaseRedisClient(redisClient); // 释放 Redis 连接
        }
    }
}

async function getData(key: string) {
    let redisClient;
    try {
        redisClient = await getRedisClient(); // 获取 Redis 连接
        let res;
        res = await redisClient.get(key); // 设置数据
        console.log(`get data successfully for key: ${key}, ${res}`);
    } catch (error) {
        console.error('Error setting data:', error);
    } finally {
        if (redisClient) {
            releaseRedisClient(redisClient); // 释放 Redis 连接
        }
    }
}

// 使用示例
export async function redisDemo() {
    await setData('exampleKey', 'exampleValue');
    await getData('exampleKey');
}

export async function getRedisDemo() {
    await getData('exampleKey');
}
