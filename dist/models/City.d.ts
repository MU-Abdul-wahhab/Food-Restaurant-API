import * as mongoose from "mongoose";
declare const _default: mongoose.Model<{
    name: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    lat: number;
    lng: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    lat: number;
    lng: number;
}> & {
    name: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    lat: number;
    lng: number;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    lat: number;
    lng: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    lat: number;
    lng: number;
}>> & mongoose.FlatRecord<{
    name: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    lat: number;
    lng: number;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
