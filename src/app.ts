import { Express } from 'express';
import { router as main_router } from './routers/main_router';
import { router as excuses_router } from './developer-excuses/api.developer-excuses';
import { db_plugin } from './db';

export const main_app = async (app: Express) => {
	db_plugin(app);

	app.use('/', main_router);
	app.use('/excuses', excuses_router);
};
