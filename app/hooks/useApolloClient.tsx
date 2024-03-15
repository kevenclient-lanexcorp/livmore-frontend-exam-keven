import { ApolloClient, InMemoryCache } from '@apollo/client'

export default () => new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
})
