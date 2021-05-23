import * as React from 'react'
import { Item } from '../react-scheduler'
import { ReactSchedulerDayViewHeader } from './react-scheduler-day-view-header'

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
    <React.Fragment>
      <ReactSchedulerDayViewHeader hours={hours} />
      <div className="react-scheduler-day-view">
        {items.map((item, idx) => (
          <div key={idx} className="react-scheduler-day-view-row">
            <div className="react-scheduler-day-view-cell">
              <div>{item.name}</div>
            </div>
            {hours.map((cellDate, idx) => (
              <div key={idx} className="react-scheduler-day-view-cell">
                {/* {
                  item.items.find((i) => moment(i.date).hours() === cellDate)
                    ?.text
                } */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}
