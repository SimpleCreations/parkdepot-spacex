import { GetShips_ships } from "./__generated__/GetShips";
import { memo } from "react";
import Table from "react-bootstrap/Table";

const weightFormat = new Intl.NumberFormat(undefined, {
  style: "unit",
  unit: "kilogram",
});

const ShipsListItem = memo(
  ({
    ship: { name, type, active, home_port, year_built, weight_kg },
  }: {
    ship: GetShips_ships;
  }) => (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
      <td>{active && "Yes"}</td>
      <td>{home_port}</td>
      <td>{year_built}</td>
      <td>{weight_kg != null && weightFormat.format(weight_kg)}</td>
    </tr>
  )
);

const ShipsList = ({ ships }: { ships: GetShips_ships[] }) => (
  <Table striped={true} bordered={true}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Active</th>
        <th>Home port</th>
        <th>Year built</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>
      {ships.map((ship) => (
        <ShipsListItem key={ship.id} ship={ship} />
      ))}
    </tbody>
  </Table>
);

export default memo(ShipsList);
