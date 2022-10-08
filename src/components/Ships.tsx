import React, { useMemo } from "react";
import Container from "react-bootstrap/Container";
import { createEnumParam, useQueryParam, withDefault } from "use-query-params";
import { gql, useQuery } from "@apollo/client";
import { GetShips, GetShips_ships } from "./__generated__/GetShips";
import ShipsList from "./ShipsList";

enum ViewingMode {
  LIST = "list",
  GALLERY = "gallery",
}

const SHIPS_QUERY = gql`
  query GetShips {
    ships {
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
  const { data } = useQuery<GetShips>(SHIPS_QUERY);
  const ships = useMemo(
    () =>
      data?.ships?.filter<GetShips_ships>(
        (ship): ship is GetShips_ships => ship !== null
      ),
    [data?.ships]
  );

  const [viewingMode, setViewingMode] = useQueryParam(
    "view",
    withDefault(
      createEnumParam(Object.values(ViewingMode)),
      ViewingMode.LIST,
      false
    ),
    { removeDefaultsFromUrl: true }
  );

  return (
    <Container as="main">{ships && <ShipsList ships={ships} />}</Container>
  );
};

export default Ships;
