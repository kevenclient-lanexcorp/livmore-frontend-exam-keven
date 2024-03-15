## React Coding Test with GraphQL, Apollo and Hasura

### Next.js

Install the dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Navigate to `http://localhost:3000`

### Apollo Client in Next.js

Install Apollo Client

```bash
npm install @apollo/client graphql
```

Connect to GraphQL server using Apollo Client

```tsx
./app/hooks/useApolloClient.tsx

import { ApolloClient, InMemoryCache } from '@apollo/client'

export default () => new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
})
```

Wrap the root component with `ApolloProvider` component

```tsx
app/page.tsx

import { ApolloProvider } from '@apollo/client'

const client = useApolloClient()

return (
  <ApolloProvider client={client}>
    <Workspaces/>
  </ApolloProvider>
)
```

### GraphQL Query

Workspaces

```gql
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
```

Result

```gql
{
  "data": {
    "workspaces": [
      {
        "id": 1,
        "name": "Room 1",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing commodo elit at imperdiet. Ut consequat semper viverra nam libero justo laoreet sit. Ut etiam sit amet nisl purus in mollis nunc sed. Turpis nunc eget lorem dolor sed viverra ipsum nunc.",
        "amenities": [
          "Refreshments",
          "Smart TV",
          "Whiteboard"
        ],
        "city": {
          "name": "Pyrmont, Sydney"
        },
        "area": "Bondi Junction, Sydney NSW",
        "street": "33 Bondi Road, Bondi Junction NSW 2000",
        "contact_no": "+61 02 924 577",
        "email": "reception@space.com",
        "website": "www.space.com",
        "am": true,
        "pm": true,
        "from": "09:00:00+00",
        "to": "18:00:00+00",
        "capacity": 20,
        "workspace_prices": [
          {
            "id": 1,
            "price_type": {
              "id": 1,
              "name": "All day",
              "unit": "day"
            },
            "value": 40
          },
          {
            "id": 2,
            "price_type": {
              "id": 2,
              "name": "Half day",
              "unit": "day"
            },
            "value": 20
          },
          {
            "id": 3,
            "price_type": {
              "id": 3,
              "name": "Hourly",
              "unit": "hour"
            },
            "value": 10
          }
        ]
      }
      ...
    ]
  }
}
```
