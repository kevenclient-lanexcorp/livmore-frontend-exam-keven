export interface IWorkspacePrice {
  id: number
  price_type: {
    id: number
    name: string
    unit: string
  }
  value: number
}
