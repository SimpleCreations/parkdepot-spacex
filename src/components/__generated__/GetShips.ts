/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShips
// ====================================================

export interface GetShips_ships_position {
  __typename: "ShipLocation";
  latitude: number | null;
  longitude: number | null;
}

export interface GetShips_ships {
  __typename: "Ship";
  id: string | null;
  name: string | null;
  image: string | null;
  type: string | null;
  abs: number | null;
  active: boolean | null;
  attempted_landings: number | null;
  class: number | null;
  course_deg: number | null;
  home_port: string | null;
  imo: number | null;
  mmsi: number | null;
  model: string | null;
  position: GetShips_ships_position | null;
  roles: (string | null)[] | null;
  speed_kn: number | null;
  status: string | null;
  successful_landings: number | null;
  url: string | null;
  weight_kg: number | null;
  weight_lbs: number | null;
  year_built: number | null;
}

export interface GetShips {
  ships: (GetShips_ships | null)[] | null;
}
