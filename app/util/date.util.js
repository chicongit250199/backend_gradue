import moment from 'moment-timezone';

export function getIsoWeek () {
  const _moment = moment();
  return {
    week: _moment.isoWeek(),
    year: _moment.isoWeekYear()
  };
}

export function nextDays (days) {
  const _nextDate = moment().add(days, 'days');
  return _nextDate.toDate();
}

export function addMonths (date, month) {
  return moment(date).add(month, 'months').toDate();
}

export function formatDateUTC (date) {
  return moment.tz(date, 'YYYY.MM.DD HH:mm:ss', 'Asia/Seoul').toDate();
}

export function differentMonth (date, date1) {
  return Math.ceil(moment(date).diff(moment(date1), 'months', true));
}

export function differentHours(date, date1) {
  return Math.ceil(moment(date).diff(moment(date1), 'hours', true));
}

export function differentDays (date, date1) {
  return Math.ceil(moment(date).diff(moment(date1), 'days', true));
}

export function getCurrenMonthInformation () {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const nextMonth = month + 1;
  return {
    month, year,
    range: {
      from: new Date(year, month, 1, 0, 0, 0, 0),
      to: new Date(year, nextMonth, 1, 0, 0, 0, 0)
    }
  };
}

export function cutString (txt) {
  const sub = [];
  txt.split(' ').filter(i => i)
    .forEach(t => {
      sub.push(t.substring(0, t.length - 1));
    });
  const dateCreated = new Date(`${sub[0]}/${sub[1]}/${sub[2]}`);
  return dateCreated;
}
