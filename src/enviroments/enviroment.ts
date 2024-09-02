import { DevEnvironment  } from "./enviroment.dev";
import { ProdEnvironment  } from "./enviroment.prod";

export interface Environment   {
    db_uri: string,
    jwt_secret_key: string,
    jwt_refresh_secret_key: string,
    sendgrid?: string,
    gmail_auth?:{
         user : string,
        pass : string
    }
}

export function getEnvVariables(){
    if(process.env.NODE_ENV == 'production'){
        return ProdEnvironment ;
    }
    return DevEnvironment ;
}