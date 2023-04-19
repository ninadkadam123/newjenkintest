import mongoose from 'mongoose';
import { MethodsDocument } from './methods.model';

export interface MethodStepsDocument extends mongoose.Document {
    method: MethodsDocument['_id'],
    stepNumber: number,
    title: string,
    description: string
}

const methodStepsSchema = new mongoose.Schema<MethodStepsDocument>({
    method: {
        type: mongoose.Types.ObjectId,
        ref: "Methods"
    },
    stepNumber: Number,
    title: String,
    description: String
});

const MethodStepsSchema = mongoose.model<MethodStepsDocument>('MethodSteps', methodStepsSchema);


export default MethodStepsSchema;