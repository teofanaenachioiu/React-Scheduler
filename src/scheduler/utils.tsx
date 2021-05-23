import moment, { Moment } from 'moment'

export function formatDateDay(date: Moment | Date): string {
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

export enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  COMPUTER = 'COMPUTER',
  LARGE_MONITOR = 'LARGE_MONITOR',
  WIDE_MONITOR = 'WIDE_MONITOR',
}

export const DEVICE_MAX_WIDTHS = {
  [DeviceType.MOBILE]: 768,
  [DeviceType.TABLET]: 991,
  [DeviceType.COMPUTER]: 1199,
  [DeviceType.LARGE_MONITOR]: 1919,
}

export function getDeviceTypeFromWidth(width: number) {
  if (width < DEVICE_MAX_WIDTHS[DeviceType.MOBILE]) {
    return DeviceType.MOBILE
  } else if (width < DEVICE_MAX_WIDTHS[DeviceType.TABLET]) {
    return DeviceType.TABLET
  } else if (width < DEVICE_MAX_WIDTHS[DeviceType.COMPUTER]) {
    return DeviceType.COMPUTER
  } else if (width < DEVICE_MAX_WIDTHS[DeviceType.LARGE_MONITOR]) {
    return DeviceType.LARGE_MONITOR
  } else {
    return DeviceType.WIDE_MONITOR
  }
}
