console.log('req.body');
export async function post(req) {
	console.log(req);
	return { status: '200', body: { cod: 'done' } };
}
