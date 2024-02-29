import { InferSchemaType } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { ExcusesDocument, Excuses } from './model.developer-excuses';
import { prepare_db } from '../db';
import data from '../data/excuses.json';

const excuses: InferSchemaType<ExcusesDocument>[] = data;

(async () => {
	const { close_connection } = await prepare_db();

	try {
		await Excuses.collection.drop();
		console.log('✅ Deleted all previous excuses');
	} catch (error) {
		const e = error as MongoServerError;
		if (e.codeName === 'NamespaceNotFound') {
			console.log('❌ Collection does not exist, cannot drop');
		}
	}

	const docs = await Promise.all(
		excuses.map(async (e) => {
			const bc_doc = await Excuses.create(e);
			return bc_doc;
		})
	);

	console.log(`✅ Created ${docs.length} excuses`);

	await close_connection();
})();
