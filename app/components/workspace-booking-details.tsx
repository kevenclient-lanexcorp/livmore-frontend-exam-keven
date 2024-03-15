import { IWorkspace } from '@/app/interfaces/workspaces'
import { ALL_DAY, HALF_DAY, HOURLY } from '@/app/constants/price-types'
import { Location } from '@/app/icons'
import {
  Modal, Button, Input, DatePicker, TimePicker, Radio, Collapse,
} from 'antd'

import {
  PlusCircleOutlined, PlusOutlined, MinusOutlined, MinusCircleOutlined,
  UpOutlined, DownOutlined,
} from '@ant-design/icons'

import { useEffect, useState } from 'react'
import lodash, { range } from 'lodash'

interface Props {
  value: IWorkspace
  onClose?: () => void
}

const WorkspaceBookingDetails: React.FC<Props> = ({
  value, onClose,
}) => {
  const [priceType, setPriceType] = useState(ALL_DAY)
  const [quantity, setQuantity] = useState(1)
  const [timePeriod, setTimePeriod] = useState<string>()
  const [showBookingNotes, setShowBookingNotes] = useState(false)

  const getPriceTypeStyles = (type: number) => {
    const styles = '!border-none !shadow-none'
    return priceType === type ? `!bg-white ${styles}`
      : `!bg-transparent ${styles}`
  }

  const increaseQuantity = () => {
    if (!(quantity < value.capacity)) return
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity < 2) return
    setQuantity(quantity - 1)
  }

  useEffect(() => {
    const { am, pm } = value
    const compacted = lodash.compact([am, pm])

    switch (compacted.length) {
      case 2:
        setTimePeriod('AM')
        break
      case 1:
        setTimePeriod(am ? 'AM' : 'PM')
        break
    }
  }, [])

  return (
    <Modal open={true} footer={false} width={960} onCancel={onClose}>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1.5">
          <span className="text-2xl">
            {value.name}
          </span>
          <span className="flex gap-1 items-center
            text-[#787979] text-sm">
            <Location/> {value.city.name}
          </span>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col gap-1.5">
              <div className="h-[230px] bg-[#868e96]"></div>
              <div className="grid grid-cols-5 gap-1.5">
                {range(5).map((value) => (
                  <div key={value} className="h-[56px] bg-[#868e96]"></div>
                ))}
              </div>
            </div>
            <div>
              <span className="font-bold">Description</span>
              <p>{value.description}</p>
            </div>
            <div>
              <span className="font-bold">Pricing</span>
              <div className="grid grid-cols-3">
                {value.workspace_prices.map((price) => {
                  return (
                    <div key={price.id}>
                      <span className="text-sm mr-2">
                        {price.price_type.name}:
                      </span>
                      <span className="text-[#2f54eb] font-bold">
                        ${price.value}
                      </span>
                      <span className="text-sm">
                        /{price.price_type.unit}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <span className="font-bold">Amenities</span>
              <p>{lodash.join(value.amenities, ' • ')}</p>
            </div>
            <span className="text-[#2f54eb] text-sm">
              <PlusCircleOutlined/> Catering & other options
            </span>
          </div>
          <div className="flex flex-col gap-3 bg-[#f3f4fa] w-1/2 rounded-md p-3">
            <span className="text-[20px] font-bold">
              Booking Details
            </span>
            <div className="flex justify-between gap-3">
              <div className="bg-[#0306200a] rounded-lg w-fit p-0.5">
                <Button type="text" onClick={() => setPriceType(HOURLY)}
                  className={getPriceTypeStyles(HOURLY)}>
                  Hourly
                </Button>
                <Button type="text" onClick={() => setPriceType(ALL_DAY)}
                  className={getPriceTypeStyles(ALL_DAY)}>
                  All day
                </Button>
                <Button type="text" onClick={() => setPriceType(HALF_DAY)}
                  className={getPriceTypeStyles(HALF_DAY)}>
                  Half day
                </Button>
              </div>
              {priceType === HALF_DAY && (
                <Radio.Group value={timePeriod}
                  onChange={(event) => setTimePeriod(event.target.value)}>
                  <Radio.Button value="AM" disabled={!value.am}>AM</Radio.Button>
                  <Radio.Button value="PM" disabled={!value.pm}>PM</Radio.Button>
                </Radio.Group>
              )}
            </div>
            <Input prefix={<Location/>} value={value.area} disabled/>
            {priceType === ALL_DAY && (
              <DatePicker/>
            )}
            {priceType === HALF_DAY && (
              <TimePicker.RangePicker disabled allowEmpty/>
            )}
            {priceType === HOURLY && (
              <div className="flex justify-between gap-3">
                <DatePicker/>
                <TimePicker.RangePicker/>
              </div>
            )}
            <div className="flex justify-between border-b border-dashed pb-3">
              <span className="text-sm">
                Quantity
              </span>
              <div className="flex items-center gap-3.5">
                <Button className="!bg-[#0306200a]"
                  icon={<PlusOutlined/>} onClick={increaseQuantity}/>
                {quantity}
                <Button className="!bg-[#0306200a]"
                  icon={<MinusOutlined/>} onClick={decreaseQuantity}/>
              </div>
            </div>
            <div className="flex flex-col gap-2 grow">
              {!showBookingNotes && (
                <span className="text-[#2f54eb] text-sm cursor-pointer"
                  onClick={() => setShowBookingNotes(true)}>
                  <PlusCircleOutlined/> Booking Notes
                </span>
              )}
              {showBookingNotes && (<>
                <span className="text-[#ff4d4f] text-sm cursor-pointer"
                  onClick={() => setShowBookingNotes(false)}>
                  <MinusCircleOutlined/> Remove Booking Notes
                </span>
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }}/>
              </>)}
            </div>
            <div className="bg-white rounded-lg">
              <Collapse className="!bg-transparent" bordered={false} expandIconPosition="end"
                expandIcon={(props) => {
                  return props.isActive ? <UpOutlined className="!text-[#2f54eb]"/>
                    : <DownOutlined className="!text-[#2f54eb]"/>
                }}>
                <Collapse.Panel key="details-amount" header={(
                  <span className="text-[#2f54eb] text-sm">
                    Details amount
                  </span>
                )}>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <span className="text-sm">
                        Subtotal
                      </span>
                      <span>$100.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">
                        Discount (50%)
                      </span>
                      <span>-$50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">
                        Credit (1h)
                      </span>
                      <span>-$5.00</span>
                    </div>
                  </div>
                </Collapse.Panel>
              </Collapse>
              <div className="border-t mx-3 py-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      GST (10%)
                    </span>
                    <span className="text-xs border
                      rounded py-0.5 px-1.5">
                      Inclusive
                    </span>
                  </div>
                  <span>$4.55</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>$44.55</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default WorkspaceBookingDetails
