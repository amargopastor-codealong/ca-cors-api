import { Express } from 'express';
import { router as main_router } from './routers/main_router';
import { router as excuses_router } from './developer-excuses/api.developer-excuses';
import { db_plugin } from './db';
import { SECRET_TOKEN, MONGODB_URL } from './config';
import cors from 'cors';
import { requestLogger } from './middlewares/requestLogger.middleware';
import { unknownEndpoint } from './middlewares/unknownEndpoint.middleware';
import session from 'express-session';
import MS from 'connect-mongo';
import { cookieHijackingMiddleware } from './middlewares/cookieHijacking.middleware';
import { router as crypto_router } from './routers/crypto_router';

const corsOptions = {
	origin: 'http://localhost:5173',
	optionsSuccessStatus: 200,
};

export const main_app = async (app: Express) => {
	db_plugin(app);

	app.use(cors(corsOptions));
	app.use(requestLogger);

	app.use(
		session({
			secret: SECRET_TOKEN,
			resave: false,
			saveUninitialized: true,
			cookie: { secure: false },
			store: MS.create({ mongoUrl: MONGODB_URL }),
		})
	);

	app.use(cookieHijackingMiddleware);

	app.use('/', main_router);
	app.use('/excuses', excuses_router);
	app.use('/', crypto_router);

	app.use(unknownEndpoint);
};
