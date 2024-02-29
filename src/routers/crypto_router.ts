import express from 'express';
import jwt from 'jsonwebtoken';
export const router = express.Router();
import { SECRET_TOKEN } from '../config';
import { authenticateToken } from '../middlewares/authenticateToken.middleware';
import { Excuses } from '../developer-excuses/model.developer-excuses';

router.get('/encriptar/:secret', async (req, res, next) => {
	const { secret } = req.params;
	console.log('req.params', req.params);

	const token = jwt.sign({ secret: secret }, SECRET_TOKEN, {
		expiresIn: '1000s',
	});

	res.status(200).send({ msg: `El secret es ${secret}`, token: `${token}` });
});

router.post('/random', authenticateToken, async (req, res) => {
	const excuses_docs = await Excuses.find();
	const random = Math.floor(Math.random() * excuses_docs.length);

	const { session }: { session: any } = req;
	if (session.counter !== undefined) {
		session.counter += 1;
	} else {
		session.counter = 0;
	}

	console.log('SESSION', session);
	res.send(excuses_docs[random]);
});

router.post('/desencriptar', authenticateToken, async (req: any, res, next) => {
	try {
		let secret = req.token.secret;
		res.status(200).send({ msg: `El secret es ${secret}` });
	} catch (error) {
		console.log('❌ Ops! Something went wrong ', error);
	}
});
