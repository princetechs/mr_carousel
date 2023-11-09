"use server"
import redis from './redis';

async function setredis(visitorId: string, newCredits: number) {
    try {
        const result = await redis.hset(visitorId, { Credits: newCredits });
        return true;
    } catch (error) {
        console.error('Error updating user credits in Redis:', error);
        return false;
    }
}

async function getredis(visitorId: string, Credits: string) {
    try {
        const result = await redis.hget(visitorId, Credits);
        return result;
    } catch (error) {
        console.error('Error getting user credits from Redis:', error);
        return false;
    }
}
export { setredis, getredis };
