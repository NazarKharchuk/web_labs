console.log('req.body');

import nodemailer from 'nodemailer';

export async function post(req) {
	console.log('Email: ' + req.body.FMail);
	console.log('Message: ' + req.body.FMessage);

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: 'austin.parker60@ethereal.email',
			pass: 'MkaKc1C15GzjY2TK5T'
		}
	});

	let info = await transporter.sendMail({
		from: '<austin.parker60@ethereal.email>',
		to: req.body.FMail,
		subject: 'Hello ✔',
		text: req.body.FMessage,
		html: req.body.FMessage
	});
	console.log('Message sent: %s', info.messageId);

	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	//res.status(200).json(info);

	return { status: '200', body: { cod: 'done' } };
}
