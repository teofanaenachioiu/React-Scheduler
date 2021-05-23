import moment from 'moment'
import * as React from 'react'
import { Entry, Item } from '../react-scheduler'
import { ReactSchedulerDayViewCell } from './react-scheduler-day-view-cell'
import { ReactSchedulerDayViewHeader } from './react-scheduler-day-view-header'
import './react-scheduler-day-view.css'

type Props = {
  date: Date
  items: Item[]
  hourStart: number
  hourEnd: number
  hourStep: number
}

export function ReactSchedulerDayView({
  date,
  items,
  hourStart,
  hourEnd,
  hourStep,
}: Props) {
  const hours = Array.from(Array((hourEnd - hourStart) / hourStep).keys()).map(
    (key) => hourStart + key * hourStep,
  )
  if (!hours.includes(hourEnd)) {
    hours.push(hourEnd)
  }

  const cellText = (item: Item, _hour: number): Entry | undefined => {
    return item.items.find((i) => {
      if (i.date instanceof Date) {
        return (
          moment(i.date).startOf('days').isSame(moment(date).startOf('days')) &&
          moment(i.date).hours() === _hour
        )
      } else {
        const [start, end] = i.date

        return (
          (moment(date).isBetween(
            moment(start).startOf('days'),
            moment(end).startOf('days'),
            null,
          ) ||
            false) &&
          _hour === moment(end).hours()
        )
      }
    })
  }

  return (
    <div className="react-scheduler-day">
      <ReactSchedulerDayViewHeader hours={hours} />
      <div className="react-scheduler-week-view">
        {items.map((item, idx) => (
          <div key={idx} className="react-scheduler-week-view-row">
            <div className="react-scheduler-week-view-cell">
              <div>{item.name}</div>
            </div>
            {hours.map((cellDate, idx) => (
              <div key={idx} className="react-scheduler-week-view-cell">
                <ReactSchedulerDayViewCell
                  startHour={hourStart}
                  entry={cellText(item, cellDate)}
                  onClick={item.onClick}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
