import { IWorkspacePrice } from '@/app/interfaces/workspace-prices'

export interface IWorkspace {
  id: number
  name: string
  description: string
  amenities: string[]
  city: {
    name: string
  }
  area: string
  street: string
  contact_no: string
  email: string
  website: string
  am: boolean
  pm: boolean
  from: string
  to: string
  capacity: number
  workspace_prices: IWorkspacePrice[]
}
