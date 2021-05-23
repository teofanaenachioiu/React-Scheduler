import * as React from 'react'
import { Item } from '../react-scheduler'
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
                {/* {
                  item.items.find((i) => moment(i.date).hours() === cellDate)
                    ?.text
                } */}
                daa
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
