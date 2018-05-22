var ioredis = require('ioredis');
var config = require('./config');
var redisClient = new ioredis(config.RedisHost);
module.exports = redisClient;