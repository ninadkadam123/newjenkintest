import sgMail from '@sendgrid/mail';
import config from 'config';
import logger from '../utils/logger'

export async function sendMail ({subject, message}: {subject: string, message: string}) {

    try{
        sgMail.setApiKey(config.get('sendGridApiKey'));

        const msg: sgMail.MailDataRequired = {
            to: 'shanptl12@gmail.com',
            from: 'team@designitwell.com',
            subject: subject,
            text: message,
            html: `<strong>${message}</strong>`
        }

        await sgMail.send(msg);

        return 'Email sent'
    } catch(e) {
        logger.error(e);
        throw e;
    }
}


export async function sendFeedbackMail(message: string) {
    try{
        await sendMail({subject: 'Feedback', message: message});

        return 'Feedback sent';

    } catch(e) {
        throw e;
    }
}