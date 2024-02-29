import { RequestHandler } from 'express';

export const unknownEndpoint: RequestHandler = (req, res) => {
	res.status(404).send({ error: '❌ Ops! Unknown endpoint' });
};
