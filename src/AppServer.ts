import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import cors from 'cors';
import * as swagger from 'swagger-express-ts';
import { Request, Response } from 'express';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import helmet from 'helmet';  // Security value of header cors
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swaggerDocument.json';


// @ts-ignore
class AppServer extends Server {

    private readonly SERVER_STARTED = 'Server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.enableCors();
        this.app.use(helmet());
        this.setupControllers();
    }

    // Add controllers
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
    // Allows to use header cors
    private enableCors(): void {
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token'
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: 'localhost:30001',
            preflightContinue: false
        };
        Logger.Info('Enables Cors');
        this.app.use(cors(options));
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
