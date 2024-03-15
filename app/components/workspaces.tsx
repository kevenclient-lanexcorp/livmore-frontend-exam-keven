import WorkspacesFilter from '@/app/components/workspaces-filter'
import Workspace from '@/app/components/workspace'
import useWorkspaceQuery from '@/app/hooks/useWorkspaceQuery'
import { useAppContext } from '@/app/contexts/app'
import { IWorkspace } from '@/app/interfaces/workspaces'
import { useEffect, useState } from 'react'
import lodash from 'lodash'

const Workspaces = () => {
  const context = useAppContext()
  const workspaceQuery = useWorkspaceQuery()
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const search = async () => {
      const variables = {}
      const { price_type, workspace_type, city, name } = context.searchFilters
      if (price_type) {
        lodash.set(variables, 'where.workspace_prices.price_type.id._eq', price_type)
      }
      if (workspace_type) {
        lodash.set(variables, 'where.workspace_type._eq', workspace_type)
      }
      if (city) {
        lodash.set(variables, 'where.city._eq', city)
      }
      if (name) {
        lodash.set(variables, 'where.name._ilike', `%${name}%`)
      }
      const result = await workspaceQuery.get(variables)
      setSearchResults(result.workspaces)
    }
    search()
  }, [context.searchFilters])

  return (
    <div className="flex flex-col gap-4 px-8 py-4">
      <WorkspacesFilter/>
      {searchResults.map((workspace: IWorkspace) => {
        return <Workspace key={workspace.id} value={workspace}/>
      })}
    </div>
  )
}

export default Workspaces
