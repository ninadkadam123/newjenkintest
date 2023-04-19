import { Request, Response } from "express";
import moment from "moment";
import { FeedbackBody, FeedbackStatus, GetFeedbackResponse, ResolveFeedbackBody, UpdateFeedbackStatusBody } from "../interfaces/types";
import { clearBin, deleteFeedback, getFeedbacks, resolveFeedbacks, sendFeedback, updateFeedbacks } from "../services/feedback.service";
import logger from '../utils/logger';

export async function sendFeedbackHandler(req: Request<{}, {}, FeedbackBody>, res: Response) {
    try {
        await sendFeedback({ email: req.body.email, feedback: req.body.message });

        res.send('Feedback sent Successfully');
    } catch (e) {
        logger.error(e);

        res.status(500).send('Something went wrong');
    }
}

export async function getFeedbacksHandler(req: Request, res: Response<GetFeedbackResponse | string>) {
    try {
        const feedbacks = await getFeedbacks();

        res.send(feedbacks.map(feedback => {
            return {
                _id: feedback._id,
                email: feedback.email,
                feedback: feedback.feedback,
                status: feedback.status,
                resolved: feedback.resolved,
                createdAt: moment(feedback.createdAt).format('DD-MMM-YYYY')
            }
        }));

    } catch (e) {

        logger.error(e);

        res.status(500).send('Something went wrong');
    }
}

export async function addFeedbackToBinHandler(req: Request<{ feedbackId: string }>, res: Response) {
    try {

        const feedbackId = req.params.feedbackId;

        if (!feedbackId) {
            return res.status(401).send(
            {
                message: 'Feedback Id is required'
            });
        }

        await updateFeedbacks(feedbackId, { status: FeedbackStatus.bin });
        
        return res.send({
            message: 'Successfully Updated'
        });

    } catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: 'Something went wrong'
        });
    }
}

export async function  updateFeedbackStatusHandler(req: Request<{ feedbackId: string }, {}, UpdateFeedbackStatusBody>, res: Response) {
    
    try {
        const feedbackId = req.params.feedbackId;
        
        if (!feedbackId) {
            return res.status(401).send(
            {
                message: 'Feedback Id is required'
            });
        }

        const body = req.body;
        console.log(body)

        if (!body || body.updatedStatus === undefined) {
                                                  
            return res.status(401).send(
            {
                message: 'Body is required'
            });
        }
        

         await updateFeedbacks(feedbackId, { status: body.updatedStatus });
         
        return res.send(
        {
            message: 'Successfully updated'
        });

    } catch (e) {
        logger.error(e);

        return res.send(500).send(
        {
            message: 'Something went wrong'
        });
    }
}


export async function  resolveFeedbackStatusHandler(req: Request<{ feedbackId: string }, {},ResolveFeedbackBody>, res: Response) {
    
    try {
        const feedbackId = req.params.feedbackId;
        
        if (!feedbackId) {
            return res.status(401).send(
            {
                message: 'Feedback Id is required'
            });
        }

        const body = req.body;
        if (!body || body.resolved === undefined) {
                                                  
            return res.status(401).send(
            {
                message: 'Body is required'
            });
        }
        console.log(body.resolved)
       
        await resolveFeedbacks(feedbackId, {resolved:body.resolved})
         
         
        return res.send(
        {
            message: 'Successfully resolved'
        });

    } catch (e) {
        logger.error(e);

        return res.send(500).send(
        {
            message: 'Something went wrong'
        });
    }
}

export async function deleteFeedbackHandler(req: Request<{ feedbackId: string }>, res: Response) {
    try {
        const feedbackId = req.params.feedbackId;

        if (!feedbackId) {
            return res.status(401).send(
            {
                message: 'Feedback Id is required'
            });
        }

        await deleteFeedback(feedbackId);

        return res.send(
        {
            message: 'Successfully Deleted'
        });

    } catch (e) {
        logger.error(e);

        return res.send(500).send(
        {
            message: 'Something went wrong'
        });
    }
}

export async function clearBinHandler(req: Request, res: Response) {
    try {
        await clearBin();

        return res.send(
        {
            message: 'Successfully cleared Bin'
        });

    } catch (e) {
        logger.error(e);
        return res.send(500).send(
        {
            message: 'Successfully cleared Bin'
        });
    }
}