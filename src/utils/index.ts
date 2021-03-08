import moment from 'moment'
import { generate } from 'shortid'
import { Hour, OpenHoursObj, Weekday } from '../interfaces'

const weekDays: Weekday[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

const formatTime = (seconds: number) => {
  if (!seconds) return -1
  const hour = moment().startOf('day').seconds(seconds)
  return hour.format(hour.minute() > 0 ? 'h:mm A' : 'h A')
}

// validity and type check for runtime
const isValid = (openHours: OpenHoursObj) => {
  // type check
  const isValidType = typeof openHours === 'object'

  // check if all days included
  const hasKeys = weekDays.every((day) =>
    Object.prototype.hasOwnProperty.call(openHours, day)
  )

  const flattened = Object.keys(openHours).reduce<Hour[]>(
    (initial, current: string) => initial.concat(openHours[current]),
    []
  )

  // check all hours has property of type and value
  const hasNestedKeys = flattened.every(
    (hour) =>
      Object.prototype.hasOwnProperty.call(hour, 'type') &&
      Object.prototype.hasOwnProperty.call(hour, 'value')
  )

  // check values are in between 0 - 86399
  const invalidValues = flattened
    .map((h) => h.value)
    .filter((value) => value < 0 || value > 86399)

  // check if there are equal amount of opens and closes
  const isPaired =
    flattened.map((h) => h.type).filter((s) => s === 'open').length ===
    flattened.map((h) => h.type).filter((s) => s === 'close').length

  return (
    isValidType &&
    hasKeys &&
    hasNestedKeys &&
    isPaired &&
    invalidValues.length === 0
  )
}

const saveItem = (json: OpenHoursObj) => {
  const openHours = localStorage.getItem('openhours')
  if (openHours != null) {
    const parsed = JSON.parse(openHours)
    parsed[generate()] = json
    localStorage.setItem('openhours', JSON.stringify(parsed))
  } else {
    const newOpenHours = {
      [generate()]: json
    }
    localStorage.setItem('openhours', JSON.stringify(newOpenHours))
  }
}

const removeItem = (uid: string) => {
  const items = getItems()
  delete items[uid]
  localStorage.setItem('openhours', JSON.stringify(items))
}

const getItems = () => {
  const openHours = localStorage.getItem('openhours')
  if (openHours != null) {
    return JSON.parse(openHours)
  }
}

export { weekDays, formatTime, isValid, saveItem, removeItem, getItems }
