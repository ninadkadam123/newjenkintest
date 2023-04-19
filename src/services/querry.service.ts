import { designTagsData } from '../data';
import { DesignTagsDocument } from '../models/designTags.model';
import QuerryModel, {  } from '../models/querry.model';
import logger from '../utils/logger';

export async function sendQuerry({ email, question,designTags}: { email?: string, question: string ,designTags:DesignTagsDocument[]}) {
    try {
        await QuerryModel.create({
            email: email,
            question: question,
            designTags:designTags
        });

        logger.info('Successfully saved querry');        

        return 'Successfully saved querry';

    } catch (e) {
        throw e;
    }
}