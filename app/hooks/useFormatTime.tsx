import { format, parse } from 'date-fns'
import lodash from 'lodash'

export default (time: string) => {
  const cleaned = lodash.replace(time, '+00', '')
  const parsed = parse(cleaned, 'HH:mm:ss', new Date)
  return format(parsed, 'h:mm a')
}
