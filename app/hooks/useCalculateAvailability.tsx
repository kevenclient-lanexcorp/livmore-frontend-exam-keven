import { IWorkspace } from '@/app/interfaces/workspaces'

import {
  ALL_DAY, HALF_DAY, HOURLY, PRICE_TYPE_LABELS,
} from '@/app/constants/price-types'

import useFormatTime from '@/app/hooks/useFormatTime'
import lodash from 'lodash'

export default (value: IWorkspace) => {
  const { from, to, am, pm } = value

  const calculateSchedule = (am: boolean, pm: boolean) => {
    const compacted = lodash.compact([am, pm])
    switch (compacted.length) {
      case 2: return PRICE_TYPE_LABELS[ALL_DAY]
      case 1: return PRICE_TYPE_LABELS[HALF_DAY]
      default: return PRICE_TYPE_LABELS[HOURLY]
    }
  }

  const schedule = calculateSchedule(am, pm)
  const formattedFrom = useFormatTime(from)
  const formattedTo = useFormatTime(to)

  return `${schedule} (${formattedFrom} - ${formattedTo})`
}
