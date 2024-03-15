'use client'

import {
  Dispatch, SetStateAction, createContext, useContext, useState,
} from 'react'

import { ALL_DAY } from '@/app/constants/price-types'

interface ISearchFilters {
  workspace_type?: number
  city?: number
  price_type: number
  name?: string
}

interface IAppContext {
  searchFilters: ISearchFilters
  setSearchFilters: Dispatch<SetStateAction<ISearchFilters>>
}

const AppContext = createContext({} as IAppContext)

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [searchFilters, setSearchFilters] = useState({
    price_type: ALL_DAY,
  })

  const shared = {
    searchFilters,
    setSearchFilters,
  }

  return (
    <AppContext.Provider value={shared}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default App
