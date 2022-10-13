import { GetShips_ships } from "./__generated__/GetShips";
import { memo } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Ratio from "react-bootstrap/Ratio";
import classNames from "./ShipsGallery.module.scss";

const ShipsGalleryItem = memo(
  ({ ship: { name, type, image } }: { ship: GetShips_ships }) => (
    <Col xxl={3} lg={4} md={6} sm={12}>
      <Card>
        <Ratio className={classNames.itemImageContainer} aspectRatio="4x3">
          {image != null ? (
            <Card.Img
              className={classNames.itemImage}
              variant="top"
              src={image}
              alt={name ?? ""}
            />
          ) : (
            // `Ratio` does not allow empty values as its children.
            <></>
          )}
        </Ratio>
        <Card.Body>
          {name != null && <Card.Title>{name}</Card.Title>}
          {type != null && <Card.Text className="text-muted">{type}</Card.Text>}
        </Card.Body>
      </Card>
    </Col>
  )
);

const ShipsGallery = ({ ships }: { ships: GetShips_ships[] }) => (
  <Row className="gx-3 gy-3">
    {ships.map((ship) => (
      <ShipsGalleryItem key={ship.id} ship={ship} />
    ))}
  </Row>
);

export default memo(ShipsGallery);
