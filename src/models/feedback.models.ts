import mongoose from "mongoose";
import { FeedbackStatus } from "../interfaces/types";

export interface FeedbackDocument extends mongoose.Document {
    email: string,
    feedback: string,
    resolved: boolean,
    status: FeedbackStatus,
    createdAt: Date
}

const feedbackSchema = new mongoose.Schema<FeedbackDocument>({
    email: String,
    feedback: String,
    resolved: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        default: FeedbackStatus.new
    }
},
    {
        timestamps: true
    }
);

const FeedbackSchema = mongoose.model<FeedbackDocument>('Feedback', feedbackSchema);

export default FeedbackSchema;