import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfigs(): void;
    connectMongoDB(): void;
    configureBodyParser(): void;
    allowCors(): void;
    setRoutes(): void;
    error404Handler(): void;
    handleErrors(): void;
}
