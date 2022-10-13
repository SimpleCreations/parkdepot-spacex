# Parkdepot coding challenge

## Getting started

### Run development server

```shell
npm start
```

### Build

```shell
npm run build
```

## Technical info

### Acknowledgements

The implementation of the filter by ship type is not ideal due to a flaw in the GraphQL API which does not allow to fetch a list of distinct ship types without loading all existing pages first.

As a temporary workaround, filter options contain only types of the ships that are currently loaded on the page. This implies that if there is a ship with a type that hasn't appeared yet on the currently loaded page, it will not be available as a filter option.

There is no elegant solution to this problem that does not require the backend API to be extended.
