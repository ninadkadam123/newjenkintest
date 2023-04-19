import logger from 'pino';
import moment from 'moment';

const log = logger({
    transport: {
        target: 'pino-pretty'
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time": "${moment().format()}"`
});

export default log;