import React from "react";
import { TableCell } from "@mui/material";

import { tableStyle } from "../../common/styles";

interface SummaryCellProps {}

const SummaryCell: React.FC<SummaryCellProps> = ({}) => {
  return (
    <TableCell>
      <span style={{ marginRight: "10px", marginLeft: "10px" }}>
        <img style={tableStyle.img} />
      </span>
      <span>
        <img style={tableStyle.img} />
      </span>
    </TableCell>
  );
};

export default SummaryCell;
