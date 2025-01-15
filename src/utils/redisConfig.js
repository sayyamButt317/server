import { createClient } from 'redis';

// Redis Configuratio
  
    const redisClient = await createClient({
      url: 'redis://csayyambutt317:1234@product.gypc7cm.mongodb.net/AdminPanel?'
    })
    .on("error", (err) => {
      console.error(`Error connecting to Redis: ${err}`);
    })
    .connect();
    await client.set('key', 'value');
    const value = await client.get('key');
    await redisClient.disconnect();

export default redisClient;