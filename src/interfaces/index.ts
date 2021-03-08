type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

type Hour = {
  type: 'open' | 'close'
  value: number
}

type OpenHoursProps = {
  openHours: OpenHoursObj
}

type OpenHoursObj = {
  [day in Weekday | string]: Array<Hour>
}

type IconProps = {
  color: string
}

export type { Weekday, Hour, OpenHoursProps, OpenHoursObj, IconProps }
