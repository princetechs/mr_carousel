// app/database/redis.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.NEXT_PUBLIC_REDIS_URL,
    token: process.env.NEXT_PUBLIC_REDIS_TOKEN,
} as any)

export default redis;
