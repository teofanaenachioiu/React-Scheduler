import moment from 'moment'
import * as React from 'react'
import { formatDateWithDayAndMonth, formatDateWithDayName } from '../utils'

type Props = {
  workWeek: boolean
  date: Date
}

export function ReactSchedulerWeekViewHeader({ workWeek, date }: Props) {
  const cells = Array.from(Array(workWeek ? 5 : 7).keys()).map((key) =>
    moment(date)
      .startOf('week')
      .add(key + 1, 'days'),
  )

  return (
    <div className="react-scheduler-week-view-row">
      <div className="react-scheduler-week-view-cell react-scheduler-week-view-cell-header"></div>
      {cells.map((cell, idx) => (
        <div
          key={idx}
          className="react-scheduler-week-view-cell react-scheduler-week-view-cell-header"
        >
          <div>{formatDateWithDayName(cell)}</div>
          <div className="header-date">{formatDateWithDayAndMonth(cell)}</div>
        </div>
      ))}
    </div>
  )
}
