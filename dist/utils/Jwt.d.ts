export declare class Jwt {
    static jwtSign(payload: any, expires_in?: string): string;
    static jwtVerify(token: string): Promise<any>;
}
