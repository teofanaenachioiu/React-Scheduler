import moment from 'moment'
import * as React from 'react'
import { Entry } from '../react-scheduler'

type Props = {
  date: Date
  entry: Entry | undefined
  onClick?: (event: any) => void
}

export function ReactSchedulerWeekViewCell({ date, entry, onClick }: Props) {
  const overflow =
    entry && entry.date instanceof Array
      ? moment(date).diff(
          moment.max([
            moment(entry.date[0]).startOf('days'),
            moment(date).startOf('isoWeek'),
          ]),
          'days',
        )
      : 0

  return entry ? (
    <div
      className="react-scheduler-week-view-cell-fill"
      onClick={onClick}
      style={{
        width: `calc(${overflow + 1}00% + ${overflow}px`,
        left: `calc(-${overflow * 100}% - ${overflow}px`,
      }}
    >
      {entry.text}
    </div>
  ) : null
}
