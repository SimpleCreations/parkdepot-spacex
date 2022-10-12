import React, { ReactNode, useCallback, useMemo } from "react";
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

const SHIPS_QUERY = gql`
  query GetShips($type: String) {
    ships(find: { type: $type }) {
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
  // does not reset them
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
  const { data, loading } = useQuery<GetShips, GetShipsVariables>(SHIPS_QUERY, {
    variables: { type },
  });
  const ships = useMemo(
    () =>
      data?.ships?.filter<GetShips_ships>(
        (ship): ship is GetShips_ships => ship !== null
      ),
    [data?.ships]
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

  // Choosing a component based on the viewing mode
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
