import { useLazyQuery, gql } from '@apollo/client'

export default () => {
  const [search] = useLazyQuery(gql`
    query(
      $workspaces_where: workspaces_bool_exp
    ) {
      workspaces(
        where: $workspaces_where
        order_by: { name: asc }
      ) {
        id
        name
        city {
          name
        }
        am
        pm
        from
        to
        capacity
        workspace_prices(
          where: {
            deleted_at: { _is_null: true }
          }
          order_by: { value: asc }
        ) {
          id
          price_type {
            id
            name
            unit
          }
          value
        }
      }
    }
  `)

  const get = async (variables = {}) => {
    const result = await search({ variables })
    return result.data
  }

  return { get }
}
