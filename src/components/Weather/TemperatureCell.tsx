import React from "react";
import { TableCell } from "@mui/material";

import coatImage from "../../resources/coat.png";
import hoodyImage from "../../resources/hoody.png";
import tShirtImage from "../../resources/tshirt.png";

import { getClothing } from "./weather-utils";
import { tableStyle } from "../../common/styles";
interface TemperatureCellProps {
  temperature: number;
}

const clothingImageMap: Record<string, string> = {
  coat: coatImage,
  hoody: hoodyImage,
  tshirt: tShirtImage,
};

const TemperatureCell: React.FC<TemperatureCellProps> = ({ temperature }) => {
  const clothing = getClothing(temperature);

  return (
    <TableCell sx={tableStyle.cell}>
      {temperature}°C{" "}
      <img
        src={clothingImageMap[clothing]}
        style={tableStyle.img}
        alt={clothing}
      />
    </TableCell>
  );
};

export default TemperatureCell;
