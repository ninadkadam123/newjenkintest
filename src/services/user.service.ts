
import UserModel,{} from '../models/user.model';
import logger from '../utils/logger';

export async function addUser({ name,phone,email,linkdIn,behance,role}: {name:string,phone:string,email:string,linkdIn:string,behance:string,role:string}) {
    try {
        await UserModel.create({
            name:name,
            phone:phone,
            email:email,
            linkdIn:linkdIn,
            behance:behance,
            role:role,
        });

        logger.info('Successfully added User');        

        return 'Successfully added User';
        

    } catch (e) {
        throw e;
    }
}