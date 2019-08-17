export const language = Object.freeze({
  email_confirm: {
    title: 'Mondexphone.com - 이메일계정 인증 을 요청드립니다.'
  },
  errors: {
    invalid_username: 'Username {{0}} is not allow to register'
  }
});


export function getMessage(msg, params) {
  let rs = msg;
  if (params && params.length) {
    for (let i = 0; i < params.length; i += 1) {
      rs = rs.replaceAll(`{{${i}}`, params[i]);
    }
  }

  return msg;
}
