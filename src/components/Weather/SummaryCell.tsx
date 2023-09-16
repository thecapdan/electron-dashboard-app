import React from "react";
import { TableCell } from "@mui/material";

import {
  getIcon,
  getClothing,
  clothingImageMap,
  iconImageMap,
} from "./weather-utils";

import { tableStyle } from "../../common/styles";

interface SummaryCellProps {
  temperature: number;
  percentageChance: number;
  time: string;
}

const SummaryCell: React.FC<SummaryCellProps> = ({
  temperature,
  percentageChance,
  time,
}) => {
  const clothing = getClothing(temperature);
  const iconName = getIcon(percentageChance);

  return (
    <TableCell>
      {time} <br />
      <span style={{ marginRight: "10px", marginLeft: "10px" }}>
        <img
          src={clothingImageMap[clothing]}
          style={tableStyle.img}
          alt={clothing}
        />
      </span>
      <span>
        <img
          src={iconImageMap[iconName]}
          style={tableStyle.img}
          alt={iconName}
        />
      </span>
    </TableCell>
  );
};

export default SummaryCell;
