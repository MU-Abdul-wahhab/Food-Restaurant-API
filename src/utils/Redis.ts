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
        try {
            let options: any = {};
            if (expires_at) {
                options = {
                    EX: expires_at
                }
            }
            const value1 = await client.set(key, value, options);

        } catch (e) {
            throw ('Server not connected Please Try Agian');
        }

    }

    static async getValue(key: string) {
        try {
            const value = await client.get(key);
            return value;
        } catch (e) {
            throw ('Your Sessin Has Expired : Please Login Again');
        }

    }

    static async deleteKey(key: string) {
        try {
            await client.del(key);
        } catch (e) {
            throw ('Server Not Connected');
        }


    }

}