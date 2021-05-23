import * as React from 'react'
import { Moment } from 'moment'
import { Item, Entry } from '../types'
import {
  checkIsFriday,
  checkIsInInterval,
  checkIsSameDay,
  datesRange,
} from '../utils'
import { ReactSchedulerWeekViewCell } from './react-scheduler-week-view-cell'
import { ReactSchedulerWeekViewHeader } from './react-scheduler-week-view-header'
import './react-scheduler-week-view.css'

type Props = {
  workWeek: boolean
  date: Date
  items: Item[]
}

export function ReactSchedulerWeekView({ workWeek, date, items }: Props) {
  const dates = datesRange(date, workWeek)

  const cellEntry = (item: Item, cellDate: Moment): Entry | undefined =>
    item.items.find((i) =>
      i.date instanceof Date
        ? checkIsSameDay(i.date, cellDate)
        : checkIsSameDay(i.date[1], cellDate) ||
          (checkIsFriday(cellDate) && checkIsInInterval(cellDate, i.date)),
    )

  return (
    <React.Fragment>
      <ReactSchedulerWeekViewHeader dates={dates} />
      <div className="react-scheduler-week-view">
        {items.map((item, idx) => (
          <div key={idx} className="react-scheduler-view-row">
            <div className="react-scheduler-view-cell">
              <div>{item.name}</div>
            </div>
            {dates.map((cellDate, idx) => (
              <div key={idx} className="react-scheduler-view-cell">
                {
                  <ReactSchedulerWeekViewCell
                    date={cellDate.toDate()}
                    entry={cellEntry(item, cellDate)}
                    onClick={item.onClick}
                  />
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}
