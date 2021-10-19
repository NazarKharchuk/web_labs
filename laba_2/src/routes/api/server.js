import nodemailer from 'nodemailer';
import rateLimit from 'lambda-rate-limiter';
const limiter = rateLimit({
	interval: 60000
});
import sanitizeHtml from 'sanitize-html';

export async function post(req) {
	console.log('Email: ' + req.body.FMail);
	console.log('Message: ' + sanitizeHtml(req.body.FMessage));

	let ip = req.headers['x-forwarded-for'];

	try {
		await limiter.check(3, ip);
	} catch (error) {
		return { status: '429', body: { code: 429, message: 'Too many requests.' } };
	}

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: 'austin.parker60@ethereal.email',
			pass: 'MkaKc1C15GzjY2TK5T'
		}
	});

	let info;

	try {
		info = await transporter.sendMail({
			from: '<austin.parker60@ethereal.email>',
			to: sanitizeHtml(req.body.FMail),
			subject: 'Hello ✔',
			text: sanitizeHtml(req.body.FMessage),
			html: sanitizeHtml(req.body.FMessage)
		});
	} catch (error) {
		return {
			status: '500',
			body: { code: 500, message: 'Connecting to mailer failed', json: info }
		};
	}

	console.log('Message sent: %s', info.messageId);

	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	return { status: '200', body: { code: 200, message: 'done', json: info } };
}
