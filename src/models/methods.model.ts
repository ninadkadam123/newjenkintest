import mongoose from 'mongoose'
import { DesignTagsDocument } from './designTags.model'
import { MethodCategoryDocument } from './methodCategory.model';

export interface MethodsDocument extends mongoose.Document {
    title: string,
    shortDescription: string,
    illustration: string,
    designTags: DesignTagsDocument['_id'][],
    category: MethodCategoryDocument['_id']
}

const methodSchema = new mongoose.Schema<MethodsDocument>({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    illustration: {
        type: String
    },
    designTags: [{
        type: mongoose.Types.ObjectId,
        ref: 'DesignTag'
    }],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'MethodCategory'
    }
});

const MethodSchema = mongoose.model<MethodsDocument>('Methods', methodSchema);

export default MethodSchema;