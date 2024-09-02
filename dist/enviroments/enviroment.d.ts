export interface Environment {
    db_uri: string;
    jwt_secret_key: string;
    sendgrid?: string;
    gmail_auth?: {
        user: string;
        pass: string;
    };
}
export declare function getEnvVariables(): Environment;
