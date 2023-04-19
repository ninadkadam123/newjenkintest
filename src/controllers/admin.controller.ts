import { Request, Response } from 'express';
import { AdminFormBody, Method } from '../interfaces/types';
import { designTagsData, methodCategoryData } from '../data'
import { DesignPhaseDocument } from '../models/designPhase.model';
import { addDesignPhase, addDesignTags, addMethod, addMethodCategory, addReference, addSteps, deleteAllTags, deleteMethod, deleteReferences, deleteSteps, getDesignTags, getMethodCategory, updateMethodDetails, updateMethodReference, updateMethodSteps } from '../services/admin.service';
import log from '../utils/logger';
import logger from '../utils/logger';
import { formatImageUrl } from '../utils/utils';

export async function addDesignPhaseHandler (req: Request<{}, {}, DesignPhaseDocument>, res: Response) {
    try {
        const designPhase = await addDesignPhase(req.body);

        return res.send(designPhase);
    }
    catch(e) {
        log.error(e);
        res.status(500).send(e);
    }
}

export async function addDesignTagHandler (req: Request, res: Response) {
    try {
        const designTag = await addDesignTags(designTagsData);

        return res.send(designTag);
    }
    catch(e) {
        log.error(e);
        res.status(500).send(e);
    }
}

export async function getDesignTagsHandler (req: Request, res: Response) {
    try {
        const designTags = await getDesignTags();

        return res.send(designTags);
    }
    catch(e) {
        log.error(e);
        res.status(500).send(e);
    }
}

export async function deleteAllTagsHandler(req: Request, res: Response) {
    try {
        await deleteAllTags();

        return res.sendStatus(200);
    }
    catch(e) {
        log.error(e);
        res.status(500).send(e);
    }
}

export async function addMethodCategoryHandler(req: Request, res: Response) {
    try {
        const methodCategories = await addMethodCategory(methodCategoryData);

        return res.send(methodCategories);
    }
    catch(e) {
        log.error(e);
        res.status(500).send(e);
    }
}

export async function getMethodCategoryHandler(req: Request, res: Response) {
    try {
        const methodCategories = await getMethodCategory();

        return res.send(methodCategories);
    }
    catch(e) {
        log.error(e);
        res.send(500).send(e);
    }
}


export async function addAdminFormData(req: Request<{}, {}, AdminFormBody>, res: Response) {
    try {

        const {method, reference, steps} = req.body;

        log.info('Recieved add data request');
        log.info(req.body);

        const formattedIconUrl = formatImageUrl(method.illustration);

        const methods = await addMethod({
            title: method.title,
            illustration: formattedIconUrl,
            shortDescription: method.shortDescription,
            category: method.category,
            designTags: method.designTags
        });

        log.info('method added to db with id: ' + methods._id);

        const references = reference.map(i => {
            return {
                method: methods._id,
                ...i
            }
        });

        
        await addReference(references);
        log.info('References added to db')

        const step = steps.map(i => {
            return {
                method: methods._id,
                ...i
            }
        });

        await addSteps(step);

        log.info('steps added to db');

        return res.send({ message: 'Method added successfully'})
    }
    catch(e) {
        return res.status(500).send(e);
    }
}

export async function updateDetailsHandler(req: Request<{methodId: string}, {}, AdminFormBody>, res: Response) {
    try{
        const methodId = req.params.methodId;

        const formattedImageUrl = formatImageUrl(req.body.method.illustration);

        const updatedMethod: Method = {
            ...req.body.method,
            illustration: formattedImageUrl
        }

        await updateMethodDetails(methodId, updatedMethod);

        await updateMethodSteps(methodId, req.body.steps);

        await updateMethodReference(methodId, req.body.reference);

        res.send({
            message: 'Successfully Updated'
        });
    } catch(e) {
        logger.error(e)
        res.status(500);
    }
}

export async function deleteMethodHandler(req: Request<{methodId: string}>, res: Response) {
    try{
        const methodId = req.params.methodId;

        await deleteMethod(methodId);
        
        await deleteSteps(methodId);

        await deleteReferences(methodId);

        res.send({
            mesage: 'successfully deleted'
        })

    } catch(e) {
        logger.error(e);
        res.send(500)
    }
}