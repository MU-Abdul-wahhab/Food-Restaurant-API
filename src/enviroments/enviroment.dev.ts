import { Environment } from "./enviroment";
import { Utils } from "../utils/Utils";

Utils.dotenvConfigs();

export const DevEnvironment: Environment = {
    db_uri: process.env.DEV_DB_URI,
    jwt_secret_key: process.env.DEV_JWT_SECRET_KEY,
    jwt_refresh_secret_key : process.env.DEV_REFRESH_SECRET_KEY,
    sendgrid: process.env.DEV_SENDGRID_API_KEY,
    gmail_auth: {
        user: process.env.DEV_GMAIL_USER,
        pass: process.env.DEV_GMAIL_PASS
    },
    redis: {
        username : process.env.LOCAL_REDIS_USERNAME,
        password : process.env.LOCAL_REDIS_PASSWORD,
        host : process.env.LOCAL_REDIS_HOST,
        port : parseInt(process.env.LOCAL_REDIS_PORT)
    }

}