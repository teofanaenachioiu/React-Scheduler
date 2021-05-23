import moment, { Moment } from 'moment'
import * as React from 'react'
import { Entry, Item } from '../react-scheduler'
import { ReactSchedulerWeekViewCell } from './react-scheduler-week-view-cell'
import { ReactSchedulerWeekViewHeader } from './react-scheduler-week-view-header'
import './react-scheduler-week-view.css'

type Props = {
  workWeek: boolean
  date: Date
  items: Item[]
}

export function ReactSchedulerWeekView({ workWeek, date, items }: Props) {
  const dates = Array.from(Array(workWeek ? 5 : 7).keys()).map((key) =>
    moment(date)
      .startOf('days')
      .startOf('week')
      .add(key + 1, 'days'),
  )

  const cellText = (item: Item, cellDate: Moment): Entry | undefined => {
    return item.items.find((i) => {
      if (i.date instanceof Date) {
        return moment(i.date).startOf('days').isSame(cellDate)
      } else {
        const [start, end] = i.date
        return (
          moment(end).startOf('days').isSame(cellDate) ||
          (moment(cellDate).days(5).isSame(cellDate) &&
            moment(cellDate).isBetween(
              moment(start).startOf('days'),
              moment(end).startOf('days'),
              null,
            )) ||
          false
        )
      }
    })
  }

  return (
    <React.Fragment>
      <ReactSchedulerWeekViewHeader workWeek={workWeek} date={date} />
      <div className="react-scheduler-week-view">
        {items.map((item, idx) => (
          <div key={idx} className="react-scheduler-week-view-row">
            <div className="react-scheduler-week-view-cell">
              <div>{item.name}</div>
            </div>
            {dates.map((cellDate, idx) => (
              <div key={idx} className="react-scheduler-week-view-cell">
                {
                  <ReactSchedulerWeekViewCell
                    date={cellDate.toDate()}
                    entry={cellText(item, cellDate)}
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
