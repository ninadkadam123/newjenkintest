import { UpdateQuery } from 'mongoose';
import { FeedbackStatus } from '../interfaces/types';
import FeedbackModel, { FeedbackDocument } from '../models/feedback.models';
import logger from '../utils/logger';

export async function sendFeedback({ email, feedback }: { email?: string, feedback: string }) {
    try {
        await FeedbackModel.create({
            email: email,
            feedback: feedback,
        });

        logger.info('Successfully saved feedback');

        return 'Successfully saved feedback';

    } catch (e) {
        throw e;
    }
}


export async function getFeedbacks() {
    try {
        const feedbacks = await FeedbackModel.find({}).select(['_id', 'email', 'feedback', 'resolved', 'status', 'createdAt']);

        return feedbacks;
    } catch (e) {
        throw e;
    }
}

export async function updateFeedbacks(id: FeedbackDocument['_id'], update: UpdateQuery<FeedbackDocument>) {
    try {
        
        return FeedbackModel.updateOne({ _id: id }, update);
    } catch (e) {
        throw e;
    }
}

export async function resolveFeedbacks(id: FeedbackDocument['_id'], update: UpdateQuery<FeedbackDocument>) {
    try {
        console.log(update)
        return FeedbackModel.updateOne({ _id: id }, update);
    } catch (e) {
        throw e;
    }
}



export async function deleteFeedback(id: FeedbackDocument['_id']) {
    try {
        return FeedbackModel.findByIdAndDelete(id);
    } catch (e) {
        throw e;
    }
}


export async function clearBin() {
    try{
        await FeedbackModel.deleteMany({$or:[{status: FeedbackStatus.bin},{resolved:true}]});
    } catch(e) {
        throw e;
    }
}