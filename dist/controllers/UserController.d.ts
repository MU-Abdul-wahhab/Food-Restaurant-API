export declare class UserController {
    static signup(req: any, res: any, next: any): Promise<void>;
    static verifyUserEmailToken(req: any, res: any, next: any): Promise<void>;
    static resendVerificationEmail(req: any, res: any, next: any): Promise<void>;
    static login(req: any, res: any, next: any): Promise<void>;
    static sendPasswordOtp(req: any, res: any, next: any): Promise<void>;
    static verifyResetPasswordToken(req: any, res: any, next: any): Promise<void>;
    static resetPassword(req: any, res: any, next: any): Promise<void>;
    static Profile(req: any, res: any, next: any): Promise<void>;
    static updatePhoneNumber(req: any, res: any, next: any): Promise<void>;
    static updateUserProfile(req: any, res: any, next: any): Promise<void>;
}
