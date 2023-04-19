import mongoose from "mongoose";
import { ReferenceFormat, ReferenceType } from "../interfaces/types";
import { MethodsDocument } from "./methods.model";

export interface ReferenceDocument extends mongoose.Document {
    method: MethodsDocument['_id'],
    type: ReferenceType,
    format: ReferenceFormat,
    link: string
}

const referenceSchema = new mongoose.Schema<ReferenceDocument>({
    method: {
        type: mongoose.Types.ObjectId,
        ref: 'Methods'
    },
    type: String,
    format: String,
    link: String
});

const ReferenceSchema = mongoose.model<ReferenceDocument>('Reference', referenceSchema);

export default ReferenceSchema;
