import mongoose from 'mongoose';
import { DesignPhaseDocument } from './designPhase.model';

export interface DesignTagsDocument extends mongoose.Document {
    phase: DesignPhaseDocument['_id'],
    tag: string
}

const designTagSchema = new mongoose.Schema<DesignTagsDocument>({
    phase: {
        type: mongoose.Types.ObjectId,
        ref: 'DesignPhase'
    },
    tag: String
});

const DesignTagSchema = mongoose.model<DesignTagsDocument>('DesignTag', designTagSchema);

export default DesignTagSchema