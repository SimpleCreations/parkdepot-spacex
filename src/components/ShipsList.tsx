import { GetShips_ships } from "./__generated__/GetShips";
import { memo } from "react";
import Table from "react-bootstrap/Table";

const ShipsListItem = memo(
  ({ ship: { name, type } }: { ship: GetShips_ships }) => (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
    </tr>
  )
);

const ShipsList = ({ ships }: { ships: GetShips_ships[] }) => (
  <Table striped={true} bordered={true}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
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
