import moment from 'moment'
import * as React from 'react'
import { Entry } from '../react-scheduler'

type Props = {
  date: Date
  entry: Entry | undefined
  onClick?: (event: any) => void
}

export function ReactSchedulerWeekViewCell({ date, entry, onClick }: Props) {
  const overflow = (content: Entry): number =>
    content.date instanceof Date
      ? 0
      : moment(date).diff(
          moment.max([
            moment(content.date[0]).startOf('days'),
            moment(date).startOf('isoWeek'),
          ]),
          'days',
        )

  return entry ? (
    <div
      className="react-scheduler-week-view-cell-fill"
      onClick={onClick}
      style={{
        width: overflow(entry) ? overflow(entry) + 1 + '00%' : '100%',
        left: overflow(entry) ? '-' + overflow(entry) + '00%' : '0',
      }}
    >
      {entry.text}
    </div>
  ) : null
}
