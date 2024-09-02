import * as mongoose from "mongoose";
declare const _default: mongoose.Model<{
    status: boolean;
    created_at: Date;
    updated_at: Date;
    banner: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    status: boolean;
    created_at: Date;
    updated_at: Date;
    banner: string;
}> & {
    status: boolean;
    created_at: Date;
    updated_at: Date;
    banner: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    status: boolean;
    created_at: Date;
    updated_at: Date;
    banner: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    status: boolean;
    created_at: Date;
    updated_at: Date;
    banner: string;
}>> & mongoose.FlatRecord<{
    status: boolean;
    created_at: Date;
    updated_at: Date;
    banner: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
