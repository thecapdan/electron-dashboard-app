import React from "react";
import { TableCell } from "@mui/material";

import sunglassesImage from "../../resources/sunglasses.png";
import capImage from "../../resources/cap.png";
import umbrellaImage from "../../resources/tshirt.png";

import { getIcon, tableStyle } from "./weather-utils";

interface RainCellProps {
  percentageChance: number;
}

const iconImageMap: Record<string, string> = {
  sunglasses: sunglassesImage,
  cap: capImage,
  umbrella: umbrellaImage,
};

const RainCell: React.FC<RainCellProps> = ({ percentageChance }) => {
  const iconName = getIcon(percentageChance);

  return (
    <TableCell sx={tableStyle.cell}>
      {percentageChance}%{" "}
      <img src={iconImageMap[iconName]} style={tableStyle.img} alt={iconName} />
    </TableCell>
  );
};

export default RainCell;
