import React from "react";
import { TableCell } from "@mui/material";

import { tableStyle } from "../../common/styles";
interface TravelCellProps {
  temperature: number;
}

const TravelCell: React.FC<TravelCellProps> = ({ temperature }) => {
  return (
    <TableCell sx={tableStyle.cell}>
      {temperature}°C <img style={tableStyle.img} />
    </TableCell>
  );
};

export default TravelCell;
