import React from "react";
import { TableCell } from "@mui/material";

import { tubeImageMap } from "./travel-utils";

import { tableStyle } from "../../common/styles";

interface SummaryCellProps {
  lineStatus: {
    name: string;
    status: any;
  };
}

const SummaryCell: React.FC<SummaryCellProps> = ({ lineStatus }) => {
  return lineStatus && lineStatus.name ? (
    <TableCell>
      <span style={{ marginRight: "10px", marginLeft: "10px" }}>
        <img
          src={tubeImageMap[lineStatus.name]}
          style={tableStyle.img}
          alt={lineStatus.name}
        />
      </span>
      <h3>{lineStatus.status}</h3>
    </TableCell>
  ) : (
    <TableCell></TableCell> // Render an empty TableCell when lineStatus.name is undefined
  );
};

export default SummaryCell;
