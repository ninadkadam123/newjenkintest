import express from 'express';
import config from 'config';
import cors from 'cors';
import logger from './utils/logger';
import routes from './routes';
import connect from './utils/connect';
// import { Routes } from 'interfaces/routes.interface'
// import { errorMiddleware } from 'middlewares/error.middleware';

const port = process.env.PORT || config.get<number>('port');

const app = express();

app.use(
    cors({
        origin: '*'
    })
);

app.use(express.json());

app.listen(port, async () => {
    logger.info('App running on port ' + port);

    await connect();

    routes(app);
})

// class App {
//     public app: express.Application;
//     public env: string;
//     public port: string | number;

//     constructor(routes: Routes[]) {
//         this.app = express();
//         this.env = process.env.NODE_ENV
//         this.port = port;

//         this.initializeMiddlewares();
//         this.initializeErrorHandling()
//     }

//     public listen () {
//         this.app.listen(this.port, () => {
//             logger.info(`=================================`);
//             logger.info(`======= ENV: ${this.env} =======`);
//             logger.info(`🚀 App listening on the port ${this.port}`);
//             logger.info(`=================================`);
//         });
//     }

//     public getServer() {
//         return this.app;
//     }

//     private initializeMiddlewares() {
//         app.use(cors({ origin: '* '}));
//         app.use(express.json());
//     }

//     private initializeErrorHandling() {
//         this.app.use(errorMiddleware);
//     }
// }