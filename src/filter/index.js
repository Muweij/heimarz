import moment from 'moment/moment'
export function formatTime(value, str) {
  return moment(value).format(str)
}
