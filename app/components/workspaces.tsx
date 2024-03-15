import WorkspacesFilter from '@/app/components/workspaces-filter'
import Workspace from '@/app/components/workspace'
import WorkspaceDetails from '@/app/components/workspace-details'
import WorkspaceBookingDetails from '@/app/components/workspace-booking-details'
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
      const { price_type, workspace_type, city, name, am, pm, from, to } = context.searchFilters
      if (price_type) {
        lodash.set(variables, 'workspaces_where.workspace_prices.price_type.id._eq', price_type)
      }
      if (workspace_type) {
        lodash.set(variables, 'workspaces_where.workspace_type.id._eq', workspace_type)
      }
      if (city) {
        lodash.set(variables, 'workspaces_where.city.id._eq', city)
      }
      if (name) {
        lodash.set(variables, 'workspaces_where.name._ilike', `%${name}%`)
      }
      if (am) {
        lodash.set(variables, 'workspaces_where.am._eq', am)
      }
      if (pm) {
        lodash.set(variables, 'workspaces_where.pm._eq', pm)
      }
      if (from) {
        lodash.set(variables, 'workspaces_where.from._lte', from)
      }
      if (to) {
        lodash.set(variables, 'workspaces_where.to._gte', to)
      }
      const result = await workspaceQuery.get(variables)
      setSearchResults(result?.workspaces ?? [])
    }
    search()
  }, [context.searchFilters])

  const openWorkspaceDetails = (workspace: IWorkspace) => {
    if (lodash.isEqual(context.selectedWorkspace, workspace)) {
      context.setSelectedWorkspace(null)
      return
    }
    context.setSelectedWorkspace(workspace)
  }

  return (
    <div className="flex gap-4 px-8 py-4">
      <div className="flex flex-col gap-4 grow">
        <WorkspacesFilter/>
        {searchResults.map((workspace: IWorkspace) => {
          return <Workspace key={workspace.id} value={workspace}
            onClick={() => openWorkspaceDetails(workspace)}/>
        })}
      </div>
      <div className="hidden md:block h-screen bg-[#868e96] rounded-3xl w-1/2 p-2">
        {context.selectedWorkspace && (
          <WorkspaceDetails value={context.selectedWorkspace}/>
        )}
      </div>
      {context.workspaceBookingDetails && (
        <WorkspaceBookingDetails value={context.workspaceBookingDetails}
          onClose={() => context.setWorkspaceBookingDetails(null)}/>
      )}
    </div>
  )
}

export default Workspaces
