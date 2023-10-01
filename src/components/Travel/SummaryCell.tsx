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
    <TableCell style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={tubeImageMap[lineStatus.name]}
          style={tableStyle.img}
          alt={lineStatus.name}
        />
        <p style={{ margin: "0px" }}>{lineStatus.status}</p>
      </div>
    </TableCell>
  ) : (
    <TableCell></TableCell> // Render an empty TableCell when lineStatus.name is undefined
  );
};

export default SummaryCell;
