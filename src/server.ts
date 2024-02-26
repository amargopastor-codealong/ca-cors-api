import express, { Express } from 'express';
import { PORT } from './config';
import { main_app } from './app';

const server: Express = express();

main_app(server);

server.listen(PORT, () => {
	console.log(`✅ Ready on port ${PORT}`);
});
