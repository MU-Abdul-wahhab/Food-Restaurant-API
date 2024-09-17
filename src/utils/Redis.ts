import { createClient } from 'redis';
import { getEnvVariables } from '../enviroments/enviroment';

export const client = createClient(
    {
        // url : 'redis://'+getEnvVariables().redis.host+':'+getEnvVariables().redis.port,
        username: getEnvVariables().redis.username,
        password: getEnvVariables().redis.password,
        socket: {
            host: getEnvVariables().redis.host,
            port: getEnvVariables().redis.port
        }
    }
);

export class Redis {

    static connectToRedis() {
        // this.client.on('error', (err) => console.log("Redis Client Error", err));
        client.connect().then(() => {
            console.log('Connected To Redis');

        }).catch(e => {
            throw (e);
        });

    }

    static async setValue(key: string, value: string, expires_at?) {
        let options: any = {};
        if (expires_at) {
            options = {
                EX: expires_at
            }
        }
        await client.set(key, value, options);
    }

    static async getValue(key: string) {
        const value = await client.get(key);
        return value;
    }

     static async deleteKey(key: string) {
        await client.del(key);
    }

}