import * as React from 'react'
import { useState } from 'react'
import { Moment } from 'moment'
import { Item, Entry } from '../types'
import {
  checkIsFriday,
  checkIsInInterval,
  checkIsSameDay,
  datesRange,
} from '../utils'
import { ReactSchedulerWeekViewCell } from './react-scheduler-week-view-cell'
import { ReactSchedulerWeekViewHeader } from './react-scheduler-week-view-header'

type Props = {
  workWeek: boolean
  date: Date
  items: Item[]
  multipleSlotSelection: boolean
  onSelectSlot?: (start: Date, end: Date) => void
}

export function ReactSchedulerWeekView({
  workWeek,
  date,
  items,
  multipleSlotSelection,
  onSelectSlot,
}: Props) {
  const [selectedStart, setSelectedStart] = useState(
    undefined as Moment | undefined,
  )
  const [selectedEnd, setSelectedEnd] = useState(
    undefined as Moment | undefined,
  )
  const [selectedRow, setSelectedRow] = useState(
    undefined as number | undefined,
  )

  const dates = datesRange(date, workWeek)

  const cellEntry = (item: Item, cellDate: Moment): Entry | undefined =>
    item.items.find((i) =>
      i.date instanceof Date
        ? checkIsSameDay(i.date, cellDate)
        : checkIsSameDay(i.date[1], cellDate) ||
          (checkIsFriday(cellDate) && checkIsInInterval(cellDate, i.date)),
    )

  const handleOnSelectDates = () => {
    if (onSelectSlot && selectedStart && selectedEnd) {
      if (selectedStart.isAfter(selectedEnd)) {
        onSelectSlot(selectedEnd.toDate(), selectedStart.toDate())
      } else {
        onSelectSlot(selectedStart.toDate(), selectedEnd.toDate())
      }
    }
    setSelectedRow(undefined)
    setSelectedStart(undefined)
    setSelectedEnd(undefined)
  }

  return (
    <React.Fragment>
      <ReactSchedulerWeekViewHeader dates={dates} />
      <div className="react-scheduler-week-view">
        {items.map((item, iidx) => (
          <div key={iidx} className="react-scheduler-view-row">
            <div className="react-scheduler-view-cell">
              <div>{item.name}</div>
            </div>
            {dates.map((cellDate, didx) => (
              <ReactSchedulerWeekViewCell
                key={didx}
                onMouseDown={() => {
                  !selectedStart && setSelectedStart(cellDate)
                  setSelectedEnd(cellDate)
                  setSelectedRow(iidx)
                }}
                onMouseUp={() => {
                  setSelectedEnd(cellDate)
                  handleOnSelectDates()
                }}
                onMouseOver={() => {
                  selectedRow !== undefined &&
                    selectedStart !== undefined &&
                    setSelectedEnd(cellDate)
                }}
                date={cellDate.toDate()}
                entry={cellEntry(item, cellDate)}
                onClick={item.onClick}
                active={
                  selectedStart !== undefined &&
                  selectedEnd !== undefined &&
                  (multipleSlotSelection || iidx === selectedRow) &&
                  (checkIsSameDay(cellDate, selectedStart) ||
                    checkIsSameDay(cellDate, selectedEnd) ||
                    checkIsInInterval(cellDate, [selectedStart, selectedEnd]) ||
                    checkIsInInterval(cellDate, [selectedEnd, selectedStart]))
                }
              />
            ))}
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}
