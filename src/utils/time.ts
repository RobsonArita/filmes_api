import dayjs, { ConfigType, Dayjs } from "dayjs"

export const timeAsDayjs = (value: ConfigType = new Date()): Dayjs => {
    const applyTimezone = true
  
    if (!applyTimezone) return dayjs(value, 'GMT')
  
    return dayjs(value)
  }