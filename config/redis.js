const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  //password: process.env.REDIS_PASSWORD || "",
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on('connect', () => {
    console.log("client connected from redis...");
});

redisClient.on('ready', () => {
    console.log("client connected from redis and ready to use");
});

redisClient.on('end', () => {
    console.log("client disconnected from redis");
});

redisClient.on('error', (err) => {
    console.log(err.message);
});

process.on('SIGINT', () => {
    redisClient.quit();
})

module.exports = redisClient;