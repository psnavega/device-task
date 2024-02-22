import moment from 'moment'

export function getDateNowFormatedWithHour (): string {
  const date = new Date()
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
