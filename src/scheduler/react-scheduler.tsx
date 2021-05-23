import * as React from 'react'
import { ReactSchedulerDayView } from './day-view/react-scheduler-day-view'
import { ReactSchedulerToolbar } from './toolbar/react-scheduler-toolbar'
import { ReactSchedulerWeekView } from './week-view/react-scheduler-week-view'
import './react-scheduler.css'
import { useState } from 'react'
import moment from 'moment'
import { Item, View } from './types'

type Props = {
  selectedDate?: Date
  view?: View
  workWeek?: boolean
  changeable?: boolean
  todayIcon?: boolean
  items?: Item[]
  toolbar?: React.ReactElement
  startHour?: number
  endHour?: number
  stepHour?: number
  minDate?: Date
  maxDate?: Date
  onSelectSlot?: (start: number, end: number) => void
}

export function ReactScheduler({
  selectedDate = new Date(),
  view = 'week',
  workWeek = true,
  changeable = false,
  todayIcon = true,
  items = [],
  toolbar,
  startHour = 0,
  endHour = 23,
  stepHour = 1,
  minDate,
  maxDate,
  onSelectSlot,
}: Props) {
  const [dateState, setDate] = useState(selectedDate)
  const [viewState, setView] = useState(view)

  return (
    <div className="react-scheduler">
      {toolbar ? (
        toolbar
      ) : (
        <ReactSchedulerToolbar
          minDate={minDate}
          maxDate={maxDate}
          todayIcon={todayIcon}
          date={dateState}
          view={viewState}
          changeable={changeable}
          onChangeView={(value) => setView(value)}
          onClickReset={() => setDate(moment(selectedDate).toDate())}
          onClickLeftArrow={() =>
            setDate(
              moment(dateState)
                .subtract(viewState === 'day' ? 1 : 7, 'days')
                .toDate(),
            )
          }
          onClickRightArrow={() =>
            setDate(
              moment(dateState)
                .add(viewState === 'day' ? 1 : 7, 'days')
                .toDate(),
            )
          }
        />
      )}
      {viewState === 'day' ? (
        <ReactSchedulerDayView
          date={dateState}
          items={items}
          startHour={startHour}
          endHour={endHour}
          stepHour={stepHour}
          onSelectSlot={onSelectSlot}
        />
      ) : (
        <ReactSchedulerWeekView
          workWeek={workWeek}
          date={dateState}
          items={items}
        />
      )}
    </div>
  )
}
