import * as bcrypt from 'bcrypt';
import { getEnvVariables } from '../enviroments/enviroment';
import * as jwt from "jsonwebtoken";
import * as Crypto from 'crypto';
import { Redis } from './Redis';

export class Jwt {

    static jwtSign(payload, UserId, expires_in: string = '1h') {
        // Jwt.gen_secret_key();
        return jwt.sign(payload, getEnvVariables().jwt_secret_key, {
            expiresIn: expires_in,
            audience: UserId.toString(),
            issuer: 'abdulwahhab200547@gmail.com'
        });
    }

    static jwtVerify(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, getEnvVariables().jwt_secret_key, (err, decoded) => {
                if (err) {
                    reject(err);
                } else if (!decoded) {
                    reject(new Error('User is not authorized'));
                } else {
                    resolve(decoded);
                }
            })
        })

    }

    static async jswtSignRefreshToken(
        payload,
        UserId,
        expires_in: string = '180d',
        redis_ex: number = 365 * 24 * 60 * 60
       
    ) {
        try {
            const refresh_token = jwt.sign(payload, getEnvVariables().jwt_refresh_secret_key, {
                expiresIn: expires_in,
                audience: UserId.toString(),
                issuer: 'abdulwahhab200547@gmail.com'
            });

            await Redis.setValue(UserId.toString(), refresh_token, redis_ex);
            return refresh_token;

        } catch (e) {
            throw (e);
        }
    }

    static async jwtVerifyRefreshToken(refreshToken: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, getEnvVariables().jwt_refresh_secret_key, (err, decoded) => {
                if (err) {
                    reject(err);
                } else if (!decoded) {
                    reject(new Error('User is not authorized'));
                } else {

                    const user: any = decoded;

                    Redis.getValue(user.aud).then(
                        value => {
                        
                            if (value === refreshToken) {
                                resolve(decoded);
                            } else {
                                reject(new Error('Your Sessin Has Expired : Please Login Again'));
                            }

                        }
                    ).catch(e => {
                        reject(e);

                    })

                }
            })
        })

    }

    private static gen_secret_key() {

        const DEV_access_token_secret_key = Crypto.randomBytes(32).toString('hex');
        const DEV_refresh_token_secret_key = Crypto.randomBytes(32).toString('hex');

        const PROD_access_token_secret_key = Crypto.randomBytes(32).toString('hex');
        const PROD_access_token_secret_key_refresh_token_secret_key = Crypto.randomBytes(32).toString('hex');

        console.table({
            DEV_access_token_secret_key,
            DEV_refresh_token_secret_key,
            PROD_access_token_secret_key,
            PROD_access_token_secret_key_refresh_token_secret_key
        })

    }
}