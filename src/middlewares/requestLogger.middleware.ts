import { RequestHandler } from 'express';
import parser from 'ua-parser-js';

export const requestLogger: RequestHandler = (req, res, next) => {
	const ua = parser(req.headers['user-agent']);

	console.log('🚀 Req. Brower:', ua.browser.name);
	console.log('🤖 Req. OS:  ', ua.os.name);
	console.log('🐒 Req. Vendor:  ', ua.device.vendor);
	console.log('---');

	const env = {
		navegador: ua.browser.name,
		os: ua.os.name,
	};

	(req as any).env = env;

	// console.log(req);

	next();
};
