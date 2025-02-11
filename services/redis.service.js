import Redis from "ioredis";

import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../config/env.js";

export const redisClient = new Redis({
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
  port: REDIS_PORT,
});
redisClient.on("connect", () => console.log("Redis connected successfully."));
