import * as bcrypt from  'bcrypt';
import { getEnvVariables } from '../enviroments/enviroment';
import * as jwt from "jsonwebtoken";
import * as Crypto from 'crypto';

export class Jwt{

static jwtSign(payload , UserId ,  expires_in:string = '20s'){
    // Jwt.gen_secret_key();
    return jwt.sign(payload, getEnvVariables().jwt_secret_key, {
       expiresIn: expires_in,
       audience :UserId.toString(),
       issuer: 'abdulwahhab200547@gmail.com'
     });
   }

   static jwtVerify(token:string): Promise<any>{
    return new Promise((resolve , reject)=>{
        jwt.verify(token , getEnvVariables().jwt_secret_key , (err , decoded)=>{
            if(err){
                reject(err);
            }else if(!decoded){
                reject(new Error('User is not authorized'));
            }else{
                resolve(decoded);
            }
        })
    })
    
   }

   static jswtSignRefreshToken(payload , UserId ,  expires_in:string = '180d'){
    return jwt.sign(payload, getEnvVariables().jwt_refresh_secret_key, {
       expiresIn: expires_in,
       audience :UserId.toString(),
       issuer: 'abdulwahhab200547@gmail.com'
     });
   }

   static jwtVerifyRefreshToken(token:string): Promise<any>{
    return new Promise((resolve , reject)=>{
        jwt.verify(token , getEnvVariables().jwt_refresh_secret_key , (err , decoded)=>{
            if(err){
                reject(err);
            }else if(!decoded){
                reject(new Error('User is not authorized'));
            }else{
                resolve(decoded);
            }
        })
    })
    
   }

   private static gen_secret_key(){

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