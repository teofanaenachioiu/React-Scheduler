import moment from 'moment'
import { Entry } from '../types'

type Props = {
  startHour: number
  entry: Entry | undefined
  onClick?: (event: any) => void
}

export function ReactSchedulerDayViewCell({
  startHour,
  entry,
  onClick,
}: Props) {
  const overflow =
    entry && entry.date instanceof Array
      ? moment(entry.date[1]).hours() -
        Math.max(moment(entry.date[0]).hours(), startHour)
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
