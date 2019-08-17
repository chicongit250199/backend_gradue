import { client } from 'mailgun.js';
import { container } from '../config/winston_new';
import { SYSTEM_CONFIG } from '../config/system';
import db from '../db/models';
// import {sendMail} from './gmail.service';

const log = container.get('email');
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-unused-vars
const mg = client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'
});
// eslint-disable-next-line no-unused-vars
const domain = process.env.MAILGUN_DOMAIN || 'mg.tworld101.com';
const DEBUG = false;
const systemEmail = {
  register: SYSTEM_CONFIG.NOTIFY_REGISTER_EMAIL,
  password: SYSTEM_CONFIG.NOTIFY_CHANGE_PASSWORD_EMAIL,
  withdraw: SYSTEM_CONFIG.NOTIFY_WITHDRAW_EMAIL,
  notice: SYSTEM_CONFIG.NOTIFY_NOTICE_EMAIL,
  admin: SYSTEM_CONFIG.ADMIN_EMAIL
};

// SEND EMAIL HANDLE
function createEmailSend({ from, to, cc, bcc, subject, html, status, apiResponse }) {
  return db.EmailSend.create({
    from: from,
    to: to,
    cc: cc || '',
    bcc: bcc || '',
    subject: subject,
    content: html,
    status: status,
    retry: 0,
    api_response: apiResponse,
    sent_date: new Date()
  });
}

function updateEmailSend({ status, retry }, id) {
  return db.EmailSend.update(
    {
      status,
      retry,
      sent_date: new Date()
    },
    { where: { id: id } }
  );
}

function buildTemplate(templateName, params) {
  const templatePath = path.join(__dirname, '..', 'template', 'email', `${templateName}.html`);
  log.info(`Template Path: ${templatePath} - Params: ${JSON.stringify(params)}`);
  return new Promise((resolve, reject) => {
    fs.readFile(templatePath, 'utf-8', (err, html) => {
      let emailMessage = html;
      if (err) {
        reject(err);
      }
      if (params) {
        Object.keys(params).forEach((key) => {
          const value = params[key];
          emailMessage = emailMessage.replace(new RegExp(`{{${key}}}`, 'g'), value);
        });
      }
      resolve(emailMessage);
    });
  });
}

export function sendHtml({
                           from, to, subject, html, bcc, cc
                         }, { id, retry }) {
  console.log(`EmailKEY: ${process.env.MAILGUN_API_KEY}`);
  console.log(`Send email ${subject} to ${to}`);
  const emailOpts = {
    from, to, subject, html
  };
  if (bcc) {
    emailOpts.bcc = bcc;
  }
  if (cc) {
    emailOpts.cc = cc;
  }

  // return sendMail(emailOpts, {retry: false});
  return mg.messages.create(domain, emailOpts)
    .then((t) => {
      log.info(`Send Email Resp: ${JSON.stringify(t)}`);
      if (retry) {
        return updateEmailSend({ status: 1, retry }, id);
      }
      return createEmailSend({ from, to, cc, bcc, subject, html, status: 1, api_response: JSON.stringify(t) });
    }).catch(async (error) => {
      log.error(error);
      if (retry) {
        await updateEmailSend({ status: 0, retry }, id);
      } else {
        await createEmailSend({ from, to, cc, bcc, subject, html, status: 0, api_response: '' });
      }
      console.log(error);
      throw new Error('Cannot send mail');
    });
}

export async function sendResetPassword(email, username, token) {
  const url = `${process.env.WEB_URL || 'http://localhost:4300'}/auth/reset-password?token=${token}&email=${email}`;
  const msg = await buildTemplate('reset-password', {
    resetPasswordLink: url,
    username: username
  });
  const sendInfo = {
    from: systemEmail.password,
    to: email,
    subject: 'Password Reset!!',
    html: msg
  };
  return sendHtml(sendInfo, {});
}

export function sendRegister(email, username, url) {
  try {
    const templatePath = path.join(__dirname, '..', 'template', 'email', 'email-confirm.ko.html');
    log.info(`Template Path: ${templatePath}`);
    fs.readFile(templatePath, 'utf-8', (err, html) => {
      if (err) {
        log.info(err.message);
        throw err;
      }
      const emailMsg = html.replace(/{{email_confirm_url}}/g, url).replace(/{{username}}/g, username);
      const sendInfo = {
        from: systemEmail.register,
        to: email,
        subject: 'Welcome to mondex-card!!',
        html: emailMsg
      };
      if (!DEBUG) {
        return sendHtml(sendInfo, {});
      }
      return null;
    });
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}
