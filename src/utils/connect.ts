import mongoose from "mongoose";
import config from 'config';
import logger from './logger';

async function connect() {
    
    const db = config.get<string>("dbUrl");
    mongoose.set('strictQuery', true);
    return mongoose.connect(db)
        .then(() => {
            logger.info('Connected to DB');
        })
        .catch(() => {
            logger.error('Could not connect to DB');
            process.exit(1);
        })
}

export default connect;