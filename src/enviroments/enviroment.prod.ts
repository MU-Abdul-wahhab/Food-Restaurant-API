
import { Environment } from "./enviroment";
import { Utils } from "../utils/Utils";

Utils.dotenvConfigs();

export const ProdEnvironment: Environment = {
  db_uri: process.env.PROD_DB_URI,
    jwt_secret_key: process.env.PROD_JWT_SECRET_KEY,
    jwt_refresh_secret_key : process.env.PROD_REFRESH_SECRET_KEY,
    sendgrid: process.env.PROD_SENDGRID_API_KEY,
    gmail_auth: {
        user: process.env.PROD_GMAIL_USER,
        pass: process.env.PROD_GMAIL_PASS
    },
};
