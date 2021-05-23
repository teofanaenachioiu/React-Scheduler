import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faCalendarDay,
  faCalendarWeek,
  faClock,
} from '@fortawesome/free-solid-svg-icons'
import { formatFullDate, formatDateWeek } from '../format'
import { checkIsAfter, checkIsBefore } from '../utils'
import './react-scheduler-toolbar.css'

type Props = {
  date: Date
  minDate?: Date
  maxDate?: Date
  view: 'day' | 'week'
  changeable: boolean
  todayIcon: boolean
  onClickLeftArrow: () => void
  onClickRightArrow: () => void
  onClickReset: () => void
  onChangeView: (value: 'day' | 'week') => void
}

export function ReactSchedulerToolbar({
  date,
  minDate,
  maxDate,
  view,
  todayIcon,
  changeable,
  onClickLeftArrow,
  onClickRightArrow,
  onClickReset,
  onChangeView,
}: Props) {
  return (
    <div className="react-scheduler-toolbar">
      <div>
        {todayIcon ? (
          <FontAwesomeIcon
            onClick={onClickReset}
            className="pointer"
            icon={faClock}
          />
        ) : null}
      </div>

      <div className="react-scheduler-toolbar-text">
        <FontAwesomeIcon
          visibility={checkIsAfter(date, minDate) ? 'visible' : 'hidden'}
          onClick={onClickLeftArrow}
          className="pointer"
          icon={faChevronLeft}
          size="xs"
        />

        <span>
          <FontAwesomeIcon
            icon={view === 'day' ? faCalendarDay : faCalendarWeek}
          />{' '}
          {view === 'day'
            ? formatFullDate(date)
            : `Week ${formatDateWeek(date)}`}
        </span>

        <FontAwesomeIcon
          visibility={checkIsBefore(date, maxDate) ? 'visible' : 'hidden'}
          onClick={onClickRightArrow}
          className="pointer"
          icon={faChevronRight}
          size="xs"
        />
      </div>

      <div className="pointer react-scheduler-toolbar-view">
        {changeable ? (
          <select
            name="view"
            id="view"
            onChange={(e) => onChangeView(e.target.value as 'day' | 'week')}
            value={view}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
          </select>
        ) : null}
      </div>
    </div>
  )
}
