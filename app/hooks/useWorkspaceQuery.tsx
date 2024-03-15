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
        description
        amenities
        city {
          name
        }
        area
        street
        contact_no
        email
        website
        am
        pm
        from
        to
        capacity
        workspace_prices(
          where: {
            deleted_at: { _is_null: true }
          }
          order_by: { value: desc }
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
