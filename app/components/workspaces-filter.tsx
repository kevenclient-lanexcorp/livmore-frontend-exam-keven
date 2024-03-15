import { Button, Dropdown, Radio, DatePicker, TimePicker } from 'antd'

import {
  CreditCardOutlined, DownOutlined,
} from '@ant-design/icons'

import type { MenuProps } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { Location } from '@/app/icons'
import { ICities } from '@/app/interfaces/cities'
import { ALL_DAY, HALF_DAY, HOURLY } from '@/app/constants/price-types'
import useCityQuery from '@/app/hooks/useCityQuery'
import { useAppContext } from '@/app/contexts/app'
import { useEffect, useState } from 'react'
import lodash from 'lodash'

const WorkspacesFilter = () => {
  const context = useAppContext()
  const cityQuery = useCityQuery()
  const [cities, setCities] = useState<ItemType[]>([])
  const [selectedCity, setSelectedCity] = useState<ICities>()
  const [timePeriod, setTimePeriod] = useState<string>('AM')

  const setPriceType = (type: number) => {
    const filters = context.searchFilters

    if (type !== ALL_DAY) {
      delete filters.from
      delete filters.to
    }

    if (type !== HALF_DAY) {
      delete filters.am
      delete filters.pm
    }
    context.setSearchFilters({
      ...filters,
      price_type: type,
    })
  }

  const getPriceTypeStyles = (type: number) => {
    const { price_type } = context.searchFilters
    const styles = '!border-none !shadow-none'
    return price_type === type ? `!bg-white ${styles}`
      : `!bg-transparent ${styles}`
  }

  useEffect(() => {
    const search = async () => {
      const result = await cityQuery.get({
        cities_where: {
          active: { _eq: true },
        },
      })
      const mapped: ItemType[] = lodash.map(result.cities, (city) => ({
        key: city.id,
        label: city.name,
        onClick: () => {
          setSelectedCity(city)
          context.setSearchFilters({
            ...context.searchFilters,
            city: city.id,
          })
        }
      }))
      setCities(mapped)
    }
    search()
  }, [])

  useEffect(() => {
    switch(timePeriod) {
      case 'AM':
        context.setSearchFilters({
          ...context.searchFilters,
          am: true,
          pm: false,
        })
        break
      case 'PM':
        context.setSearchFilters({
          ...context.searchFilters,
          am: false,
          pm: true,
        })
        break
    }
  }, [timePeriod])

  const onChangeTime = (range: string[]) => {
    const [from, to] = range
    context.setSearchFilters({
      ...context.searchFilters,
      from,
      to,
    })
  }

  return (
    <div className="flex flex-col gap-3.5 bg-white rounded-md p-3">
      <div className="flex justify-between">
        <div className="bg-[#0306200a] rounded-lg p-0.5">
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
        {context.searchFilters.price_type === HALF_DAY && (
          <Radio.Group value={timePeriod}
            onChange={(event) => setTimePeriod(event.target.value)}>
            <Radio.Button value="AM">AM</Radio.Button>
            <Radio.Button value="PM">PM</Radio.Button>
          </Radio.Group>
        )}
        <div className="flex gap-2 bg-[#f3f4fa] max-w-max
          py-2 px-2.5 rounded-md">
          <CreditCardOutlined className="!text-[#2F54EB]"/>
          <span className="text-sm font-bold">
            2 hrs
          </span>
        </div>
      </div>
      <Dropdown menu={{
        items: cities,
      } as MenuProps}>
        <Button className="!h-[40px]">
          <div className="flex justify-between">
            <div className="flex items-center gap-2.5">
              <Location/>
              {selectedCity && selectedCity.name}
            </div>
            <DownOutlined/>
          </div>
        </Button>
      </Dropdown>
      {context.searchFilters.price_type === ALL_DAY && (
        <DatePicker/>
      )}
      {context.searchFilters.price_type === HALF_DAY && (
        <TimePicker.RangePicker format="HH:mm:ss"
          onChange={(dates, dateStrings) => onChangeTime(dateStrings)}/>
      )}
      {context.searchFilters.price_type === HOURLY && (
        <div className="flex justify-between gap-3">
          <DatePicker/>
          <TimePicker.RangePicker className="w-full" format="HH:mm:ss"
            onChange={(dates, dateStrings) => onChangeTime(dateStrings)}/>
        </div>
      )}
    </div>
  )
}

export default WorkspacesFilter
