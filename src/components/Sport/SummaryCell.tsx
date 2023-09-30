import React from "react";
import { TableCell } from "@mui/material";

import { tableStyle } from "../../common/styles";

import { getDayByDate } from "./sport-utils";
import { Fixture } from "./sport-utils";

interface FixtureProps {
  fixture: Fixture;
}

const SummaryCell: React.FC<FixtureProps> = ({ fixture }) => {
  return (
    <TableCell>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>{getDayByDate(fixture?.fixture.date)}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>
            <img
              style={tableStyle.img}
              src={fixture?.teams.home.logo}
              title={fixture?.teams.home.name}
            />
          </span>
          <span style={{ margin: "0 5px" }}>vs</span>
          <span>
            <img
              style={tableStyle.img}
              src={fixture?.teams.away.logo}
              title={fixture?.teams.away.name}
            />
          </span>
        </div>
      </div>
    </TableCell>
  );
};

export default SummaryCell;

// <TableCell>
//   <span style={{ marginRight: "10px", marginLeft: "10px" }}>
//     <img style={tableStyle.img} />
//   </span>
//   <span>
//     <img style={tableStyle.img} />
//   </span>
// </TableCell>
