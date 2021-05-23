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
  onSelectSlot?: (start: number, end: number) => void
}

export function ReactSchedulerDayView({
  date,
  items,
  startHour,
  endHour,
  stepHour,
  onSelectSlot,
}: Props) {
  const [selectedHour, setSelectedHour] = useState(
    undefined as number | undefined,
  )
  const [selectedEndHour, setSelectedEndHour] = useState(
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
    if (onSelectSlot && selectedHour && selectedEndHour) {
      if (selectedHour > selectedEndHour) {
        onSelectSlot(selectedEndHour, selectedHour)
      } else {
        onSelectSlot(selectedHour, selectedEndHour)
      }
    }
    setSelectedRow(undefined)
    setSelectedHour(undefined)
    setSelectedEndHour(undefined)
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
                  setSelectedHour(hour)
                  setSelectedEndHour(hour)
                  setSelectedRow(ridx)
                }}
                onMouseUp={() => {
                  setSelectedEndHour(hour)
                  handleOnSelectHours()
                }}
                onMouseOver={() => {
                  selectedRow !== undefined &&
                    selectedHour !== undefined &&
                    setSelectedEndHour(hour)
                }}
                startHour={startHour}
                entry={cellEntry(item, hour)}
                onClick={item.onClick}
                active={
                  selectedRow !== undefined &&
                  selectedHour !== undefined &&
                  selectedEndHour !== undefined &&
                  ridx === selectedRow &&
                  ((hour >= selectedHour && hour <= selectedEndHour) ||
                    (hour >= selectedEndHour && hour <= selectedHour))
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
