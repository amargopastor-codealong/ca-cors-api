import { RequestHandler } from 'express';

export const cookieHijackingMiddleware: RequestHandler = (req, res, next) => {
	const { session }: { session: any } = req;

	const currentEnv = (req as any).env;

	if (session.env) {
		const sameEnvironment =
			JSON.stringify(currentEnv) === JSON.stringify(session.env);

		if (!sameEnvironment) {
			throw new Error('❌ Ops! SECURITY ISSUE, not same environment');
		}
	}

	session.env = currentEnv;
	next();
};
