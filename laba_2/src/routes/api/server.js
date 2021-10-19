import nodemailer from 'nodemailer';
import rateLimit from 'lambda-rate-limiter';
const limiter = rateLimit({
	interval: 60000
});
import sanitizeHtml from 'sanitize-html';

function ValidGmail(input) {
	return !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,8})+$/.test(input);
}

export async function post(req) {
	/*console.log('Email: ' + req.body.FMail);
	console.log('Message: ' + sanitizeHtml(req.body.FMessage));*/

	let ip = req.headers['x-forwarded-for'];

	try {
		await limiter.check(3, ip);
	} catch (error) {
		return { status: '429', body: { code: 429, message: 'Error: Too many requests.' } };
	}

	if (req.body.FMessage == '' || req.body.FMail == '') {
		return { status: '500', body: { code: 500, message: 'Error: Fields must be not empty.' } };
	}

	if (ValidGmail(req.body.FMail)) {
		return { status: '500', body: { code: 500, message: 'Error: Invalid mail.' } };
	}

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: process.env.MAIL,
			pass: process.env.PASSWORD
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
			body: { code: 500, message: 'Error: Connecting to mailer failed', json: info }
		};
	}

	/*console.log('Message sent: %s', info.messageId);

	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));*/

	return { status: '200', body: { code: 200, message: 'Success: Mail sent!', json: info } };
}
