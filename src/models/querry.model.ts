import mongoose from "mongoose";
import { DesignTagsDocument } from "./designTags.model";

export interface QuerrryDocument extends mongoose.Document {
    email: string,
    question: string,  
    designTags: DesignTagsDocument['_id'][],    
    createdAt: Date,
}

const querrySchema = new mongoose.Schema<QuerrryDocument>({
    email: String,
    question: String,
    designTags: [{
        type: mongoose.Types.ObjectId,
        ref: 'DesignTag'
    }],   
},
    {
        timestamps: {updatedAt:false}
    }
);

const QuerrySchema = mongoose.model<QuerrryDocument>('Querry', querrySchema);

export default QuerrySchema;