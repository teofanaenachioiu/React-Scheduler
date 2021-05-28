# React-Scheduler

<h2>Description</h2>
The purpose of this project is to create a tool that allows you to visualize you tasks during a week or a day.
<h3> Technologies used: </h3>
  <ul>
    <li> <a target="_blank" href="https://reactjs.org/">React</a> as the main js framework</li>
    <li> <a target="_blank" href="https://momentjs.com/">Moment.js </a> for handeling the date and time </li>
    <li> <a target="_blank" href="https://fontawesome.com/">Font Awesome</a> for icons </li>
  </ul>

## Support
The react-scheduler component works in all browsers (Chrome, Opera, Firefox, Safari etc.).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm build
```
## Screenshots

- Day view

![Screenshot](https://github.com/teofanaenachioiu/React-Scheduler/blob/main/img/scheduler1.png)

- Week view

![Screenshot](https://github.com/teofanaenachioiu/React-Scheduler/blob/main/img/scheduler2.png)


## Component Usage

Import and use the compoment:

``` 
const items = [
    {
      name: 'Teofana',
      items: [
        {
          text: 'Sedinta',
          date: moment().subtract(10, 'days').toDate(),
        },
      ],
    },
    {
      name: 'Marta',
      items: [
        {
          text: 'Workshop',
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
      name: 'Andreea',
      items: [
        {
          text: 'Interviu',
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
      name: 'Ioana',
      items: [
        {
          text: 'Conferinta',
          date: moment().subtract(2, 'days').toDate(),
        },
      ],
    },
  ] as Item[]
    <ReactScheduler
      changeable={true}
      view={'day'}
      items={items}
      minDate={moment().startOf('days').subtract(10, 'days').toDate()}
      maxDate={moment().startOf('days').add(10, 'days').toDate()}
      onSelectSlot={(start, end) => alert(`${start} ${end}`)}
    />
```

## Props

| Name | Type | Default Value | Description |
| ---- | -----| ------------- | ----------- |
| `selectedDate` | Date | Today date |  An array of keyboard keys which corresponds to musical notes, from left to right the values will be assigned to the piano tiles. |
| `view` | View Type | "week" | Color for white notes when they are pressed |
| `workWeek` | boolean | true | Color for black notes when they are pressed |
| `changeable` | boolean | false | It will show the key corresponding to each note |
| `todayIcon` | boolean | true | It will show the notes corresponding to each tile |
| `items` | Item Array | [] | The notes will start from startOctave |
| `toolbar` | ReactElement | | The notes will end at endOctave |
| `startHour` | number | 0 | It will sustain the note (some more seconds) after you release the key/click |
| `endHour` | number | 23 | It will show Indian Note (Only applicable if `showNotes` is true) |
| `stepHour` | number | 1 | Configuration for Indian note (Only applicable if `indianNote` is true) |
| `minDate` | Date |  | Configuration for Indian note (Only applicable if `indianNote` is true) |
| `maxDate` | Date |  | Configuration for Indian note (Only applicable if `indianNote` is true) |
| `multipleSlotSelection` | boolean | true  | Configuration for Indian note (Only applicable if `indianNote` is true) |
| `onSelectSlot` | function |  | Configuration for Indian note (Only applicable if `indianNote` is true) |

## Types

## Style

The component has a min-width set to 30rem. Each row has a min-height set to 3rem. The width of the component extands to the width of the parent element.


## License

MIT

