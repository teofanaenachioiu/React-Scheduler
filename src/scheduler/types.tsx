export type Entry = {
  date: Date | [Date, Date]
  text: string
}

export type Item = {
  name: string
  items: Entry[]
  onClick?: (event: any) => void
}

export type View = 'day' | 'week'
