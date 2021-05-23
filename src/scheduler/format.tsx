import moment, { Moment } from 'moment'

export function formatFullDate(date: Moment | Date): string {
  return moment(date).format('DD/MM/YYYY')
}

export function formatDateWithDayAndMonth(date: Moment | Date): string {
  return moment(date).format('DD/MM')
}

export function formatDateWithDayName(date: Moment | Date): string {
  return moment(date).format('ddd')
}

export function formatDateWeek(date: Moment | Date): string {
  return moment(date).format('w')
}

export function formatHour(hour: number): string {
  return moment().startOf('days').add(hour, 'hour').format('HH:mm')
}
