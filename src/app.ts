import { Express } from 'express';
import { main_router } from './routers/main_router';
import { db_plugin } from './db';
import cors from 'cors';
import {
	excuses_api,
	excuses_random,
	excuses_id,
	excuses_delete,
} from './developer-excuses/api.developer-excuses';

var corsOptions = {
	origin: 'http://localhost:5173',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const main_app = async (app: Express) => {
	db_plugin(app);

	app.use(cors(corsOptions));
	app.use('/', main_router);

	app.use('/excuses', excuses_api);
	app.use('/excuses', excuses_random);
	app.use('/excuses', excuses_id);
	app.use('/excuses', excuses_delete);
};
