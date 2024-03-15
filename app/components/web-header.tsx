'use client'

import { Layout, Button, Dropdown, Space, Input } from 'antd'

import {
  HeartOutlined, BellOutlined, ShoppingCartOutlined,
  CloseSquareOutlined, UnorderedListOutlined, DownOutlined,
} from '@ant-design/icons'

import type { MenuProps } from 'antd'
import { OfficeChair, Category } from '@/app/icons'
import { MEETING_ROOM, DESK_PASS } from '@/app/constants/workspace-types'
import { useAppContext } from '@/app/contexts/app'
import lodash from 'lodash'

const Header = () => {
  const context = useAppContext()
  const { Header } = Layout
  const { Search } = Input

  const setWorkspaceType = (type?: number) => {
    const filters = context.searchFilters
    if (!type) {
      delete filters.workspace_type
      context.setSearchFilters({...filters})
      return
    }
    context.setSearchFilters({
      ...filters,
      workspace_type: type,
    })
  }

  const setName = (name?: string) => {
    const filters = context.searchFilters
    if (!lodash.trim(name)) {
      delete filters.name
      context.setSearchFilters({...filters})
      return
    }
    context.setSearchFilters({
      ...filters,
      name: lodash.trim(name),
    })
  }

  return (
    <div className="hidden md:block">
      <Header className="flex justify-between items-center
        border-b-2 max-h-14 !bg-white">
        <img className="max-h-8" src="/logo.png"/>
        <div className="flex gap-4">
          <Button type="text" icon={<HeartOutlined/>}/>
          <Button type="text" icon={<BellOutlined/>}/>
          <Button icon={<ShoppingCartOutlined/>}>
            Cart
          </Button>
          <Button>
            Sign in
          </Button>
        </div>
      </Header>
      <Header className="flex justify-between items-center
        !bg-white !ps-8">
        <div className="flex gap-2">
          <Button icon={<CloseSquareOutlined/>} shape="round"
            onClick={() => setWorkspaceType(MEETING_ROOM)}>
            Meeting Room
          </Button>
          <Button className="!flex !items-center" icon={<OfficeChair/>}
            shape="round" onClick={() => setWorkspaceType(DESK_PASS)}>
            Desk Pass
          </Button>
          <Button shape="round">More</Button>
        </div>
        <div className="flex gap-4">
          <Search className="max-w-[278px]" placeholder="Search room or member..."
            onSearch={(value) => setName(value)}/>
          <Dropdown menu={{
            items: [{ label: 'All' }],
          } as MenuProps}>
            <Button>
              <Space>
                Filter by: All
                <DownOutlined/>
              </Space>
            </Button>
          </Dropdown>
          <Button type="text" icon={<UnorderedListOutlined/>}/>
          <Button type="text" className="!flex !items-center"
            icon={<Category/>}/>
        </div>
      </Header>
    </div>
  )
}

export default Header
