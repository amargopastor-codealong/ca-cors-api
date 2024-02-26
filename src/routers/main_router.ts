import express from 'express';
export const router = express.Router();

export const main_router = router.get('/', async (req, res) => {
	res.send({ hello: 'world' });
});
