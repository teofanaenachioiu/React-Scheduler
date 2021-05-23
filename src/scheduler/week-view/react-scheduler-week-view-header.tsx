import { Moment } from 'moment'
import { formatDateWithDayAndMonth, formatDateWithDayName } from '../format'

type Props = {
  dates: Moment[]
}

export function ReactSchedulerWeekViewHeader({ dates }: Props) {
  return (
    <div className="react-scheduler-week-view-row">
      <div className="react-scheduler-week-view-cell react-scheduler-week-view-cell-header"></div>
      {dates.map((date, idx) => (
        <div
          key={idx}
          className="react-scheduler-week-view-cell react-scheduler-week-view-cell-header"
        >
          <div>{formatDateWithDayName(date)}</div>
          <div className="header-date">{formatDateWithDayAndMonth(date)}</div>
        </div>
      ))}
    </div>
  )
}
