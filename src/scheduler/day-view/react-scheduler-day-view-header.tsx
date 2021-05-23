import { formatHour } from '../format'

type Props = {
  hours: number[]
}

export function ReactSchedulerDayViewHeader({ hours }: Props) {
  return (
    <div className="react-scheduler-week-view-row">
      <div className="react-scheduler-week-view-cell react-scheduler-week-view-cell-header"></div>
      {hours.map((hour, idx) => (
        <div
          key={idx}
          className="react-scheduler-week-view-cell react-scheduler-week-view-cell-header"
        >
          <div>{formatHour(hour)}</div>
        </div>
      ))}
    </div>
  )
}
