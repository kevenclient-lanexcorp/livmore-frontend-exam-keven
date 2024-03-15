import { useLazyQuery, gql } from '@apollo/client'

export default () => {
  const [search] = useLazyQuery(gql`
    query(
      $cities_where: cities_bool_exp
    ) {
      cities(
        where: $cities_where
        order_by: { name: asc }
      ) {
        id
        name
      }
    }
  `)

  const get = async (variables = {}) => {
    const result = await search({ variables })
    return result.data
  }

  return { get }
}
