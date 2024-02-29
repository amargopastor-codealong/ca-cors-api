import { Schema, Document, model } from 'mongoose';

export interface ExcusesDocument extends Document {
	title: string;
	available: boolean;
}

const schema = new Schema(
	{
		title: { type: String, required: true },
		available: { type: Boolean, required: true },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

export const Excuses = model('excuse', schema);
