import * as React from 'react'
import { ReactSchedulerDayView } from './day-view/react-scheduler-day-view'
import { ReactSchedulerToolbar } from './toolbar/react-scheduler-toolbar'
import { ReactSchedulerWeekView } from './week-view/react-scheduler-week-view'
import './react-scheduler.css'
import { useState } from 'react'
import moment from 'moment'

export type Entry = {
  date: Date | [Date, Date]
  text: string
}

export type Item = {
  name: string
  items: Entry[]
  onClick?: (event: any) => void
}

type Props = {
  defaultDate?: Date
  view?: 'day' | 'week'
  workWeek?: boolean
  changeable?: boolean
  todayIcon?: boolean
  items?: Item[]
  toolbar?: React.ReactElement
  hourStart?: number
  hourEnd?: number
  hourStep?: number
}

export function ReactScheduler({
  defaultDate = new Date(),
  view = 'week',
  workWeek = true,
  changeable = false,
  todayIcon = true,
  items = [],
  toolbar,
  hourStart = 8,
  hourEnd = 16,
  hourStep = 1,
}: Props) {
  const [dateState, setDate] = useState(defaultDate)
  const [viewState, setView] = useState(view)

  return (
    <div className="react-scheduler">
      {toolbar ? (
        toolbar
      ) : (
        <ReactSchedulerToolbar
          todayIcon={todayIcon}
          date={dateState}
          view={viewState}
          changeable={changeable}
          onChangeView={(value) => setView(value)}
          onClickReset={() => setDate(moment(defaultDate).toDate())}
          onClickLeftArrow={() =>
            setDate(
              moment(dateState)
                .subtract(view === 'day' ? 1 : 7, 'days')
                .toDate(),
            )
          }
          onClickRightArrow={() =>
            setDate(
              moment(dateState)
                .add(view === 'day' ? 1 : 7, 'days')
                .toDate(),
            )
          }
        />
      )}
      {viewState === 'day' ? (
        <ReactSchedulerDayView
          date={dateState}
          items={items}
          hourStart={hourStart}
          hourEnd={hourEnd}
          hourStep={hourStep}
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
