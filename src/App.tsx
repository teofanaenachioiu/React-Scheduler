import moment from 'moment'
import React from 'react'
import { Item, ReactScheduler } from './scheduler/react-scheduler'

function App() {
  //   window.addEventListener('resize', () =>
  //   dispatch(resizeDevice(getDeviceTypeFromWidth(window.innerWidth))),
  // );

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

  console.log(items)

  return (
    <ReactScheduler
      changeable={true}
      view={'day'}
      items={items}
      hourStart={0}
      hourEnd={23}
    />
  )
}

export default App
