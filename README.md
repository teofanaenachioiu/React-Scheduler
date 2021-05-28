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
| `selectedDate` | Date | Today date |  The date that is displayed first. |
| `view` | View Type | "week" | The view of the calendar which can be week or day. |
| `workWeek` | boolean | true | If workWeek is true, the calendar will display only work days. Else, the calendar will displays all the week days. |
| `changeable` | boolean | false | If it is true, the user has the possibility to interchange the views. |
| `todayIcon` | boolean | true | If it is true, the user has the possibility to reset the calendar to today date. |
| `items` | Item Array | [] | The items in the calendar. |
| `toolbar` | ReactElement | | Custom toolbar |
| `startHour` | number | 0 | The start hour in day view |
| `endHour` | number | 23 | The end hour in day view |
| `stepHour` | number | 1 | The number of hour between two hours in day view. |
| `minDate` | Date |  | Calendar minimum date |
| `maxDate` | Date |  | Calendar maximum date |
| `multipleSlotSelection` | boolean | true  | If it is true, the user has the possibility to select multiple slots. |
| `onSelectSlot` | function |  | The function that handles the slot selection. The event returns the start and end dates. |

## Types

```
Entry {
  date: Date | [Date, Date]
  text: string
}
```
```
Item {
  name: string
  items: Entry[]
  onClick?: (event: any) => void
}
```
```
View = 'day' | 'week'
```

## Style

The component has a min-width set to 30rem. Each row has a min-height set to 3rem. The width of the component extands to the width of the parent element.


## License

MIT

