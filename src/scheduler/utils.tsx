import moment, { Moment } from 'moment'

export function hoursRange(start: number, end: number, step: number): number[] {
  const hours = Array.from(Array((end - start) / step).keys()).map(
    (key) => start + key * step,
  )
  if (!hours.includes(end)) {
    hours.push(end)
  }
  return hours
}

export function datesRange(date: Date, workWeek: boolean): Moment[] {
  return Array.from(Array(workWeek ? 5 : 7).keys()).map((key) =>
    moment(date)
      .startOf('days')
      .startOf('week')
      .add(key + 1, 'days'),
  )
}

export function checkIsSameDay(
  date1: Date | Moment,
  date2: Date | Moment,
): boolean {
  return moment(date1).startOf('days').isSame(moment(date2).startOf('days'))
}

export function checkIsSameEndHour(date: Date | Moment, hour: number): boolean {
  return moment(date).hours() === hour
}

export function checkIsInInterval(
  date: Date | Moment,
  interval: [Date | Moment, Date | Moment],
): boolean {
  const [start, end] = interval
  return moment(date)
    .startOf('days')
    .isBetween(moment(start).startOf('days'), moment(end).startOf('days'), null)
}

export function checkIsFriday(date: Date | Moment): boolean {
  return moment(date)
    .startOf('days')
    .days(5)
    .isSame(moment(date).startOf('days'))
}

export function checkIsAfter(
  date: Date | Moment,
  minDate: Date | Moment | undefined,
): boolean {
  return minDate
    ? moment(date).startOf('days').isAfter(moment(minDate).startOf('days'))
    : true
}

export function checkIsBefore(
  date: Date | Moment,
  maxDate: Date | Moment | undefined,
): boolean {
  return maxDate
    ? moment(date).startOf('days').isBefore(moment(maxDate).startOf('days'))
    : true
}
