'use client'

import { Layout, Button, Dropdown, Space } from 'antd'

import {
  BellOutlined, MenuOutlined, CloseSquareOutlined, DownOutlined,
  CreditCardOutlined, SearchOutlined,
} from '@ant-design/icons'

import type { MenuProps } from 'antd'
import { Category } from '@/app/icons'

const Header = () => {
  const { Header } = Layout
  return (
    <div className="block md:hidden">
      <Header className="flex justify-between items-center
        border-b-2 max-h-14 !bg-white">
        <img className="max-h-8" src="/logo.png"/>
        <div className="flex gap-4">
          <Button type="text" icon={<BellOutlined/>}/>
          <Button type="text" icon={<MenuOutlined/>}/>
        </div>
      </Header>
      <Header className="flex justify-between items-center
        !bg-white !ps-8">
        <div>
          <Dropdown menu={{
            items: [],
          } as MenuProps}>
            <span>
              <Space>
                <CloseSquareOutlined/>
                Meeting Room
                <DownOutlined/>
              </Space>
            </span>
          </Dropdown>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2 bg-[#f3f4fa] max-w-max
            py-2 px-2.5 rounded-md">
            <CreditCardOutlined className="!text-[#2F54EB]"/>
            <span className="text-sm font-bold">
              2 hrs
            </span>
          </div>
          <Button type="text" icon={<SearchOutlined/>}/>
          <Button type="text" className="!flex !items-center
            justify-center" icon={<Category/>}/>
        </div>
      </Header>
    </div>
  )
}

export default Header
