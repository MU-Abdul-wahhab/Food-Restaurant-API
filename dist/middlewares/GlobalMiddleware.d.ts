export declare class GlobalMiddleware {
    static checkError(req: any, res: any, next: any): void;
    static auth(req: any, res: any, next: any): Promise<void>;
    static adminRole(req: any, res: any, next: any): void;
}
