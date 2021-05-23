import { Entry, Item } from '../types'
import {
  checkIsSameDay,
  checkIsSameEndHour,
  checkIsInInterval,
  hoursRange,
} from '../utils'
import { ReactSchedulerDayViewCell } from './react-scheduler-day-view-cell'
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
  const hours = hoursRange(hourStart, hourEnd, hourStep)

  const cellEntry = (item: Item, _hour: number): Entry | undefined =>
    item.items.find((i) =>
      i.date instanceof Date
        ? checkIsSameDay(i.date, date) && checkIsSameEndHour(i.date, _hour)
        : checkIsInInterval(date, i.date) &&
          checkIsSameEndHour(i.date[1], _hour),
    )

  return (
    <div className="react-scheduler-day-view">
      <ReactSchedulerDayViewHeader hours={hours} />
      <div className="react-scheduler-week-view">
        {items.map((item, idx) => (
          <div key={idx} className="react-scheduler-view-row">
            <div className="react-scheduler-view-cell">
              <div>{item.name}</div>
            </div>
            {hours.map((cellDate, idx) => (
              <div key={idx} className="react-scheduler-view-cell">
                <ReactSchedulerDayViewCell
                  startHour={hourStart}
                  entry={cellEntry(item, cellDate)}
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
