import moment from 'moment'
import { Entry } from '../types'

type Props = {
  startHour: number
  entry: Entry | undefined
  active: boolean
  onMouseOver: () => void
  onMouseDown: () => void
  onMouseUp: () => void
  onClick?: (event: any) => void
}

export function ReactSchedulerDayViewCell({
  startHour,
  entry,
  active,
  onMouseDown,
  onMouseUp,
  onMouseOver,
  onClick,
}: Props) {
  const overflow =
    entry && entry.date instanceof Array
      ? moment(entry.date[1]).hours() -
        Math.max(moment(entry.date[0]).hours(), startHour)
      : 0

  return (
    <div
      className={`react-scheduler-view-cell ${active ? 'active' : ''}`}
      onMouseOverCapture={onMouseOver}
      onMouseUpCapture={() => !entry && onMouseUp()}
      onMouseDownCapture={onMouseDown}
    >
      {entry ? (
        <div
          className="react-scheduler-view-cell-fill"
          onClick={onClick}
          style={{
            width: `calc(${overflow + 1}00% + ${overflow}px`,
            left: `calc(-${overflow * 100}% - ${overflow}px`,
          }}
        >
          {entry.text}
        </div>
      ) : null}
    </div>
  )
}
