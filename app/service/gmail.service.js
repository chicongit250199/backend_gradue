import db from '../db/models';
import { container } from '../config/winston_new';

const nodemailer = require('nodemailer');

const log = container.get('email');

const transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp-relay.gmail.com',
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.GMAIL_USER || 'admin@tworld101.com',
    pass: process.env.GMAIL_PASS || 'Ittech1@#$'
  }
});

// eslint-disable-next-line camelcase
function create ({ from, to, cc, bcc, subject, html, status, api_response }) {
  return db.EmailSend.create({
    from: from,
    to: to,
    cc: cc || '',
    bcc: bcc || '',
    subject: subject,
    content: html,
    status: status,
    retry: 0,
    api_response,
    sent_date: new Date()
  });
}

function update ({ status, retry }, id) {
  return db.EmailSend.update(
    {
      status,
      retry,
      sent_date: new Date()
    },
    { where: { id: id } }
  );
}

export async function sendMail ({ from, to, subject, html, bcc, cc }, { id, retry }) {
  const emailOpts = {
    from, to, subject, html
  };

  if (bcc) {
    emailOpts.bcc = bcc;
  }

  if (cc) {
    emailOpts.cc = cc;
  }

  console.log(emailOpts);

  return transporter.sendMail(emailOpts)
    .then((t) => {
      console.log(t);
      log.info(`Send Email Resp: ${JSON.stringify(t)}`);
      if (retry) {
        return update({ status: 1, retry }, id);
      }
      return create({ from, to, cc, bcc, subject, html, status: 1, api_response: JSON.stringify(t) });
    })
    .catch(async (e) => {
      log.info(e);
      if (retry) {
        await update({ status: 0, retry }, id);
      } else {
        await create({ from, to, cc, bcc, subject, html, status: 0, api_response: '' });
      }
      throw new Error('Cannot send mail');
    });
}

export async function resendEmail (id) {
  const email = await db.EmailSend.findOne({ where: { id: id } });
  if (email) {
    const { from, to, subject, html, bcc, cc, retry, id } = email;
    return sendMail({ from, to, subject, html, bcc, cc }, { id, retry: retry + 1 });
  }
  throw new Error('Cannot send mail');
}
