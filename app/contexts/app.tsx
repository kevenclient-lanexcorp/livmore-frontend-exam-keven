'use client'

import {
  Dispatch, SetStateAction, createContext, useContext, useState,
} from 'react'

import { IWorkspace } from '@/app/interfaces/workspaces'
import { ALL_DAY } from '@/app/constants/price-types'

interface ISearchFilters {
  workspace_type?: number
  city?: number
  price_type: number
  name?: string
  am?: boolean
  pm?: boolean
  from?: string
  to?: string
}

interface IAppContext {
  searchFilters: ISearchFilters
  selectedWorkspace: IWorkspace | null
  workspaceBookingDetails: IWorkspace | null
  setSearchFilters: Dispatch<SetStateAction<ISearchFilters>>
  setSelectedWorkspace: Dispatch<SetStateAction<IWorkspace | null>>
  setWorkspaceBookingDetails: Dispatch<SetStateAction<IWorkspace | null>>
}

const AppContext = createContext({} as IAppContext)

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [
    searchFilters,
    setSearchFilters,
  ] = useState({
    price_type: ALL_DAY,
  })

  const [
    selectedWorkspace,
    setSelectedWorkspace,
  ] = useState<IWorkspace | null>(null)

  const [
    workspaceBookingDetails,
    setWorkspaceBookingDetails,
  ] = useState<IWorkspace | null>(null)

  const shared = {
    searchFilters,
    selectedWorkspace,
    workspaceBookingDetails,
    setSearchFilters,
    setSelectedWorkspace,
    setWorkspaceBookingDetails,
  }

  return (
    <AppContext.Provider value={shared}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default App
