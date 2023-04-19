import { Request, Response } from 'express';

import log from '../utils/logger';


import { userBody } from '../interfaces/types';
import { addUser } from '../services/user.service';

export async function registerUser (req: Request<{}, {}, userBody>, res: Response) {
    try {
        // const user = await addUser({name:req.body.name,phone:req.body.phone,email:req.body.email,linkdIn:req.body.linkdIn,behance:req.body.behance,role:req.body.role})

        // return res.send(user);
    }
    catch(e) {
        log.error(e);
        res.status(500).send(e);
    }
}