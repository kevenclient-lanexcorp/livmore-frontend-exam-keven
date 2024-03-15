import { IWorkspace } from '@/app/interfaces/workspaces'

import {
  ALL_DAY, HALF_DAY, HOURLY, PRICE_TYPE_LABELS,
} from '@/app/constants/price-types'

import { format, parse } from 'date-fns'
import lodash from 'lodash'

export default (value: IWorkspace) => {
  const { from, to, am, pm } = value

  const formatTime = (time: string) => {
    const cleaned = lodash.replace(time, '+00', '')
    const parsed = parse(cleaned, 'HH:mm:ss', new Date)
    return format(parsed, 'h:mm a')
  }

  const calculateSchedule = (am: boolean, pm: boolean) => {
    const compacted = lodash.compact([am, pm])
    switch (compacted.length) {
      case 2: return PRICE_TYPE_LABELS[ALL_DAY]
      case 1: return PRICE_TYPE_LABELS[HALF_DAY]
      default: return PRICE_TYPE_LABELS[HOURLY]
    }
  }

  const schedule = calculateSchedule(am, pm)
  const formattedFrom = formatTime(from)
  const formattedTo = formatTime(to)

  return `${schedule} (${formattedFrom} - ${formattedTo})`
}
