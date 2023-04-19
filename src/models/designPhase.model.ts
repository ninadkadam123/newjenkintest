import mongoose from 'mongoose';

export interface DesignPhaseDocument extends mongoose.Document {
    name: string;
    color: string
}

const designPhaseSchema = new mongoose.Schema<DesignPhaseDocument>({
    name: String,
    color: String
});

const DesignPhaseSchema = mongoose.model<DesignPhaseDocument>('DesignPhase', designPhaseSchema);

export default DesignPhaseSchema;