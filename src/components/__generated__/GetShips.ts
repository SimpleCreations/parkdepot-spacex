/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShips
// ====================================================

export interface GetShips_ships {
  __typename: "Ship";
  id: string | null;
  name: string | null;
  image: string | null;
  type: string | null;
  home_port: string | null;
  year_built: number | null;
  weight_kg: number | null;
  active: boolean | null;
}

export interface GetShips {
  ships: (GetShips_ships | null)[] | null;
}

export interface GetShipsVariables {
  type?: string | null;
  limit: number;
  offset: number;
}
