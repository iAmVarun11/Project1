export function notFoundHandler(_req, res, _next) {
	return res.status(404).json({ message: 'Route not found' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
	// eslint-disable-next-line no-console
	console.error(err);
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';
	return res.status(status).json({ message });
}


