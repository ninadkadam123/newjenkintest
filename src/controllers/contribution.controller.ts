import {Request, Response} from 'express';
import { contributionResponse, QuerryBody } from '../interfaces/types';
import { sendContribution } from '../services/contribution.service';

import logger from '../utils/logger';


export async function sendContributionHandler(req: Request<{}, {}, contributionResponse>, res: Response) {
    try {
      const suggestion=req.body.suggestion
    if(suggestion!==undefined){
      await sendContribution({email:req.body.email,suggestion:req.body.suggestion,kits:req.body.kits,links:req.body.links})
    res.send('Contribution is added');
    }else{
      return res.status(401).send(
         {
             message: 'Suggestion is required'
         });
    }
} catch (e) {
   logger.error(e);

   res.status(500).send('Something went wrong');
}
}

