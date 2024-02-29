import { Types } from 'mongoose';
import express from 'express';
import { Excuses } from './model.developer-excuses';
export const router = express.Router();

// C(R)UD: List all excuses
router.get('/', async (req, res) => {
	const excuses_docs = await Excuses.find();
	res.send(excuses_docs);
});

// C(R)UD: Get the details of a random excuse
router.get('/random', async (req, res) => {
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

// C(R)UD: Get the details of a excuse
router.get('/:excuses_id', async (req, res) => {
	const { excuses_id } = req.params;

	// Check we have a valid formatted objectid
	if (!Types.ObjectId.isValid(excuses_id)) {
		throw new Error('Please, pass an object id as route param');
	}

	// Find the excuses by id
	const doc = await Excuses.findById(excuses_id);

	// Check if excuses are found
	if (doc) {
		// Return the excuses
		res.send(doc);
	}
	res.status(404);
	// res.send({ status: 'excuses not found' });
	return { status: 'excuses not found' };
});

// CRU(D): Delete a excuses
router.delete('/:excuses_id', async (req, res) => {
	const { excuses_id } = req.params;

	// Check we have a valid formatted objectid
	if (!Types.ObjectId.isValid(excuses_id)) {
		throw new Error('Please, pass an object id as route param');
	}

	await Excuses.findByIdAndDelete(excuses_id);
	console.log(`Deleted excuses ${excuses_id}`);

	// return { staus: 'deleted', excuses_id };
	res.send({ staus: 'deleted', excuses_id });
});
