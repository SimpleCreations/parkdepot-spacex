import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Container from "react-bootstrap/Container";
import {
  createEnumParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { gql, useQuery } from "@apollo/client";
import {
  GetShips,
  GetShips_ships,
  GetShipsVariables,
} from "./__generated__/GetShips";
import ShipsList from "./ShipsList";
import ShipsViewingModeSelect, { ViewingMode } from "./ShipsViewingModeSelect";
import Stack from "react-bootstrap/Stack";
import ShipsTypeSelect from "./ShipsTypeSelect";
import ShipsGallery from "./ShipsGallery";
import { Spinner } from "react-bootstrap";
import useEventListener from "@use-it/event-listener";

const SHIPS_PER_PAGE = 20;

const SHIPS_QUERY = gql`
  query GetShips($type: String, $limit: Int!, $offset: Int!) {
    ships(find: { type: $type }, limit: $limit, offset: $offset) {
      id
      name
      image
      type
      abs
      active
      attempted_landings
      class
      course_deg
      home_port
      imo
      mmsi
      model
      position {
        latitude
        longitude
      }
      roles
      speed_kn
      status
      successful_landings
      url
      weight_kg
      weight_lbs
      year_built
    }
  }
`;

const Ships = () => {
  // Storing the state of the filters in the URL ensures that a page refresh
  // does not reset them.
  const [{ view, type }, setQueryParams] = useQueryParams(
    {
      view: withDefault(
        createEnumParam(Object.values(ViewingMode)),
        ViewingMode.LIST,
        false
      ),
      type: StringParam,
    },
    {
      removeDefaultsFromUrl: true,
    }
  );
  const handleViewingModeChange = useCallback(
    (value: ViewingMode) => {
      setQueryParams({ view: value });
    },
    [setQueryParams]
  );
  const handleTypeChange = useCallback(
    (value?: string) => {
      setQueryParams({ type: value });
    },
    [setQueryParams]
  );

  // Fetching data and extracting ship types for the filter
  const { data, loading, fetchMore, variables } = useQuery<
    GetShips,
    GetShipsVariables
  >(SHIPS_QUERY, {
    variables: { type, limit: SHIPS_PER_PAGE, offset: 0 },
  });
  const unfilteredShips = data?.ships;
  const ships = useMemo(
    () =>
      unfilteredShips?.filter<GetShips_ships>(
        (ship): ship is GetShips_ships => ship !== null
      ),
    [unfilteredShips]
  );
  const shipTypes = useMemo(
    () =>
      ships
        ? [
            ...new Set(
              ships
                .map(({ type }) => type)
                .filter((value): value is string => value != null)
            ),
          ]
        : undefined,
    [ships]
  );

  // Tracking where there are more pages to load.
  // Usually the API provides the total amount of items, in which case this is
  // more straightforward to handle, but the currently used API does not.
  const hasMoreShips = useRef(true);
  // Resetting this value every time keyArgs change, meaning a different list
  // is requested.
  useEffect(() => {
    hasMoreShips.current = true;
  }, [variables?.type]);
  // Logic for fetching the next page according to the scroll position.
  const fetchingMoreRef = useRef(false);
  const fetchMoreIfScrolledToBottom = useCallback(async () => {
    if (!loading && !fetchingMoreRef.current && hasMoreShips.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight - (scrollTop + clientHeight) <= 200) {
        fetchingMoreRef.current = true;
        try {
          const { data } = await fetchMore({
            variables: { offset: unfilteredShips?.length },
          });
          if (!data.ships || data.ships.length < SHIPS_PER_PAGE) {
            hasMoreShips.current = false;
          }
        } finally {
          fetchingMoreRef.current = false;
        }
      }
    }
  }, [loading, unfilteredShips?.length]);
  useEventListener("scroll", fetchMoreIfScrolledToBottom);
  // The user's screen might be so large that the first page is fully visible.
  // This ensures that more items load anyway.
  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchMoreIfScrolledToBottom();
  }, [fetchMoreIfScrolledToBottom]);

  // Choosing a component for the content based on the viewing mode.
  let contentNode: ReactNode | undefined;
  if (ships) {
    switch (view) {
      case ViewingMode.LIST:
        contentNode = <ShipsList ships={ships} />;
        break;
      case ViewingMode.GALLERY:
        contentNode = <ShipsGallery ships={ships} />;
        break;
    }
  }

  return (
    <Container as="main">
      <h1>Ships</h1>
      <Stack gap={3}>
        <Stack direction="horizontal" gap={3}>
          <ShipsViewingModeSelect
            value={view}
            onChange={handleViewingModeChange}
          />
          <ShipsTypeSelect
            options={shipTypes ?? []}
            value={type}
            onChange={handleTypeChange}
          />
        </Stack>
        {!loading ? contentNode : <Spinner animation="border" />}
      </Stack>
    </Container>
  );
};

export default Ships;
