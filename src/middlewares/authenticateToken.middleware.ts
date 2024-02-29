import { RequestHandler, Request } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../config';

export interface IGetTokenAuthInfoRequest extends Request {
	token?: string;
}

export const authenticateToken: RequestHandler = (
	req: IGetTokenAuthInfoRequest,
	res,
	next
) => {
	// Recibimos el bearer token del header authorization
	const authHeader = req.headers['authorization'];

	const token = authHeader && authHeader.split(' ')[1];

	if (token == null)
		return res.status(401).send({ msg: '❌ Ops! No token detected' });

	jwt.verify(token, SECRET_TOKEN, (err, info) => {
		if (err) return res.status(403).send({ msg: '❌ Ops! Wrong token' });
		req.token = info as string;
		next();
	});
};
