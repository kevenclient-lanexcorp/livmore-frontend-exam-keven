'use client'

import Workspaces from '@/app/components/workspaces'
import { ApolloProvider } from '@apollo/client'
import useApolloClient from '@/app/hooks/useApolloClient'

const HomePage = () => {
  const client = useApolloClient()
  return (
    <ApolloProvider client={client}>
      <Workspaces/>
    </ApolloProvider>
  )
}

export default HomePage
