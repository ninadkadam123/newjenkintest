import { contributionLink } from '../interfaces/types';
import ContributionModel,{} from '../models/contribution.model';
import logger from '../utils/logger';

export async function sendContribution({ email,suggestion,links,kits}: { email?: string, suggestion: string,links:contributionLink[],kits:string[]}) {
    try {
        await ContributionModel.create({
            email: email,
            suggestion:suggestion,
            links:links,
            kits:kits,
        });

        logger.info('Successfully added Contribution');        

        return 'Successfully added Contribution';

    } catch (e) {
        throw e;
    }
}