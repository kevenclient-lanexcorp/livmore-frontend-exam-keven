import { IWorkspacePrice } from '@/app/interfaces/workspace-prices'

export interface IWorkspace {
  id: number
  name: string
  city: {
    name: string
  }
  am: boolean
  pm: boolean
  from: string
  to: string
  capacity: number
  workspace_prices: IWorkspacePrice[]
}
