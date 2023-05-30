/* eslint-disable no-undef */
import { createClient } from 'redis';
import { promisify } from 'util';

// class Redis client to connect, set and retrieve value from redis server
class RedisClient {
  // class constructor connects to the redis client and displays any error in connection
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  // this method returns true when the redis connection is successful else false
  isAlive() {
    return this.isClientConnected;
  }

  // async method get retrieve the value of the key passed to it's param
  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const value = await redisGet(key);
    return value;
  }

  // async method set uses the key, val and duration toset the key val in redis
  async set(key, val, time) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, val);
    await this.client.expire(key, time);
  }

  // async method del to delete the value os the key passed in the param
  async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    await redisDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
