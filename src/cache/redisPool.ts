import * as Redis from 'ioredis';
import { createPool, Pool, Factory } from 'generic-pool';

const redisConfig = {
    clusterNodes: [
        { host: "127.0.0.1", port: 7000 },
        { host: "127.0.0.1", port: 7001 },
        { host: "127.0.0.1", port: 7002 }
    ],
    redisOptions: {
        // 可以根据需要配置 Redis 选项
    },
    poolOptions: {
        max: 10, // 连接池中最大连接数
        min: 2,  // 连接池中最小连接数
        // 其他连接池选项
    }
};

let redisPool: Pool<Redis.Cluster>;

// 初始化 Redis 连接池
export function initRedisPool() {
    redisPool = createPool({
        create: async () => {
            const cluster = new Redis.Cluster(redisConfig.clusterNodes, redisConfig.redisOptions);
            // 可以在此处执行其他初始化操作
            return cluster;
        },
        destroy: async (cluster: Redis.Cluster) => {
            await cluster.disconnect(); // 使用 quit 方法断开 Redis 连接
        },
    });
}

// 获取 Redis 连接
export async function getRedisClient() {
    return redisPool.acquire();
}

// 释放 Redis 连接
export function releaseRedisClient(client: Redis.Cluster) {
    redisPool.release(client).then(r => console.log(r)).catch(err => console.log(err));
}
