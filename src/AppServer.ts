import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import {Request, Response} from 'express';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import * as cors from 'cors';
// @ts-ignore
class AppServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';

    private app: any;
    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }


    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }
    private enableCors(): void {
        const options: cors.CorsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: 'localhost:30001',
            preflightContinue: false
        };
        this.app.use(cors(options));
    }

    public start(port: number): void {
        this.app.get('*', (req: Request, res: Response) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.enableCors();
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default AppServer;