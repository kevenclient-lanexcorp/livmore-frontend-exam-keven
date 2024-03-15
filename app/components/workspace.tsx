import { Button, Divider } from 'antd'

import {
  ClockCircleOutlined, UserOutlined,
} from '@ant-design/icons'

import { IWorkspace } from '@/app/interfaces/workspaces'
import useCalculateAvailability from '@/app/hooks/useCalculateAvailability'
import { Location } from '@/app/icons'
import lodash from 'lodash'

interface Props {
  value: IWorkspace
}

const Workspace: React.FC<Props> = ({ value }) => {
  const availability = useCalculateAvailability(value)
  const price = lodash.first(value.workspace_prices)

  return (
    <div className="flex gap-6 bg-white rounded-2xl p-3">
      <div className="h-[146px] w-[129px] bg-[#868e96] rounded-xl"></div>
      <div className="flex flex-col gap-2 grow pr-4">
        <div className="flex items-center justify-between">
          <span className="font-bold">{value.name}</span>
          <span className="text-[#32915a] text-sm bg-[#eefff5]
            rounded-lg p-1.5">
            Available
          </span>
        </div>
        <div className="flex gap-1.5 text-[#787979] text-sm">
          <ClockCircleOutlined/> {availability}
        </div>
        <div className="flex grow">
          <span className="flex gap-1 items-center
            text-[#787979] text-sm h-fit">
            <Location/> {value.city.name}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[#2f54eb] font-bold">
                ${price?.value ?? 0}
              </span>
              <span className="text-[#787979] text-sm">
                per {price?.price_type.unit}
              </span>
            </div>
            <Divider type="vertical" className="!h-full !border-[#e5e7eb]"/>
            <div className="flex items-center gap-1.5">
              <UserOutlined/>
              <span className="font-bold">{value.capacity}</span>
            </div>
          </div>
          <Button type="primary" size="middle">
            Book
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Workspace
