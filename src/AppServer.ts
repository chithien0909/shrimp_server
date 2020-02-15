import "reflect-metadata";
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import {Request, Response} from 'express';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
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


    public start(port: number): void {
        this.app.get('*', (req: Request, res: Response) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default AppServer;