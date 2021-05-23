import moment from 'moment'
import { ReactScheduler } from './scheduler/react-scheduler'
import { Item } from './scheduler/types'

function App() {
  const items = [
    {
      name: 'zero',
      items: [
        {
          text: 'lala',
          date: moment().subtract(10, 'days').toDate(),
        },
      ],
    },
    {
      name: 'first',
      items: [
        {
          text: 'dada',
          date: [
            moment()
              .startOf('days')
              .add(5, 'hours')
              .subtract(11, 'days')
              .toDate(),
            moment().startOf('days').add(15, 'hours').add(2, 'days').toDate(),
          ],
        },
      ],
      onClick: () => alert('click!'),
    },
    {
      name: 'second',
      items: [
        {
          text: 'tata',
          date: moment()
            .startOf('days')
            .add(10, 'hours')
            .subtract(2, 'days')
            .toDate(),
        },
      ],
      onClick: () => alert('click!'),
    },
    {
      name: 'third',
      items: [
        {
          text: 'dadadadad adadadadad adda',
          date: moment().subtract(2, 'days').toDate(),
        },
      ],
    },
  ] as Item[]

  return (
    <ReactScheduler
      changeable={true}
      view={'day'}
      items={items}
      minDate={moment().startOf('days').subtract(10, 'days').toDate()}
      maxDate={moment().startOf('days').add(10, 'days').toDate()}
      onSelectSlot={(start, end) => alert(`${start} ${end}`)}
    />
  )
}

export default App
