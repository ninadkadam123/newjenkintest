import {Request, Response} from 'express';
import { QuerryBody } from '../interfaces/types';
import { sendQuerry } from '../services/querry.service';
import logger from '../utils/logger';

export async function sendQuerryHandler(req: Request<{}, {}, QuerryBody>, res: Response) {
         try {
            const question=req.body.question
            
       if(question!==undefined){
        await sendQuerry({ email: req.body.email, question: req.body.question ,designTags:req.body.designTags});

        res.send('Querry sent Successfully');
       }else{
        return res.status(401).send(
            {
                message: 'Querry is required'
            });
       }
    } catch (e) {
        logger.error(e);

        res.status(500).send('Something went wrong');
    }
}