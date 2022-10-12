import React, { memo, PropsWithChildren } from "react";
import { Grid, List } from "react-bootstrap-icons";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

export enum ViewingMode {
  LIST = "list",
  GALLERY = "gallery",
}

const ShipsViewingModeSelect = ({
  value,
  onChange,
}: PropsWithChildren<{
  value: ViewingMode | null;
  onChange: (value: ViewingMode) => void;
}>) => (
  <ToggleButtonGroup
    type="radio"
    name="viewingMode"
    value={value ?? ViewingMode.LIST}
    onChange={onChange}
  >
    <ToggleButton
      id={`viewingMode_${ViewingMode.LIST}`}
      value={ViewingMode.LIST}
      variant="outline-primary"
      // React Bootstrap adds `tabindex="0"` by default which breaks
      // keyboard accessibility
      tabIndex={undefined}
    >
      <List className="me-1 mb-1" />
      List view
    </ToggleButton>
    <ToggleButton
      id={`viewingMode_${ViewingMode.GALLERY}`}
      value={ViewingMode.GALLERY}
      variant="outline-primary"
      tabIndex={undefined}
    >
      <Grid className="me-1 mb-1" />
      Gallery view
    </ToggleButton>
  </ToggleButtonGroup>
);

export default memo(ShipsViewingModeSelect);
