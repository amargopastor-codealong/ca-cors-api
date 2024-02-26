import { Express } from 'express';
import mongoose from 'mongoose';
import { MONGODB_URL } from './config';

export const prepare_db = async () => {
	await mongoose.connect(MONGODB_URL);
	const close_connection = () => mongoose.disconnect();
	return { close_connection };
};

export const db_plugin = async (app: Express) => {
	await prepare_db();
	// console.log(app);
	console.log(`📦 Connected to DB ${MONGODB_URL}`);
};
