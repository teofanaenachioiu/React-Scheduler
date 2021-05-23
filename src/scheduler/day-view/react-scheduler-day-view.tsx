import { useState } from 'react'
import { Entry, Item } from '../types'
import {
  checkIsSameDay,
  checkIsSameEndHour,
  checkIsInInterval,
  hoursRange,
} from '../utils'
import { ReactSchedulerDayViewCell } from './react-scheduler-day-view-cell'
import { ReactSchedulerDayViewHeader } from './react-scheduler-day-view-header'

type Props = {
  date: Date
  items: Item[]
  startHour: number
  endHour: number
  stepHour: number
  multipleSlotSelection: boolean
  onSelectSlot?: (start: number, end: number) => void
}

export function ReactSchedulerDayView({
  date,
  items,
  startHour,
  endHour,
  stepHour,
  onSelectSlot,
  multipleSlotSelection,
}: Props) {
  const [selectedStart, setSelectedStart] = useState(
    undefined as number | undefined,
  )
  const [selectedEnd, setSelectedEnd] = useState(
    undefined as number | undefined,
  )
  const [selectedRow, setSelectedRow] = useState(
    undefined as number | undefined,
  )

  const hours = hoursRange(startHour, endHour, stepHour)

  const cellEntry = (item: Item, _hour: number): Entry | undefined =>
    item.items.find((i) =>
      i.date instanceof Date
        ? checkIsSameDay(i.date, date) && checkIsSameEndHour(i.date, _hour)
        : checkIsInInterval(date, i.date) &&
          checkIsSameEndHour(i.date[1], _hour),
    )

  const handleOnSelectHours = () => {
    if (onSelectSlot && selectedStart && selectedEnd) {
      if (selectedStart > selectedEnd) {
        onSelectSlot(selectedEnd, selectedStart)
      } else {
        onSelectSlot(selectedStart, selectedEnd)
      }
    }
    setSelectedRow(undefined)
    setSelectedStart(undefined)
    setSelectedEnd(undefined)
  }

  return (
    <div className="react-scheduler-day-view">
      <ReactSchedulerDayViewHeader hours={hours} />
      <div className="react-scheduler-week-view">
        {items.map((item, ridx) => (
          <div key={ridx} className="react-scheduler-view-row">
            <div className="react-scheduler-view-cell">
              <div>{item.name}</div>
            </div>
            {hours.map((hour, hidx) => (
              <ReactSchedulerDayViewCell
                key={hidx}
                onMouseDown={() => {
                  !selectedStart && setSelectedStart(hour)
                  setSelectedEnd(hour)
                  setSelectedRow(ridx)
                }}
                onMouseUp={() => {
                  setSelectedEnd(hour)
                  handleOnSelectHours()
                }}
                onMouseOver={() => {
                  selectedRow !== undefined &&
                    selectedStart !== undefined &&
                    setSelectedEnd(hour)
                }}
                startHour={startHour}
                entry={cellEntry(item, hour)}
                onClick={item.onClick}
                active={
                  selectedRow !== undefined &&
                  selectedStart !== undefined &&
                  selectedEnd !== undefined &&
                  (multipleSlotSelection || ridx === selectedRow) &&
                  ((hour >= selectedStart && hour <= selectedEnd) ||
                    (hour >= selectedEnd && hour <= selectedStart))
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
