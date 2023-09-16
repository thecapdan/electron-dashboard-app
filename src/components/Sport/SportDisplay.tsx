import React, { useState, useEffect } from "react";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { TableCell, Table, TableRow } from "@mui/material";
import SummaryCell from "./SummaryCell";

interface SportDisplayProps {
  summary: boolean;
  collapsed?: boolean;
}

const SportDisplay: React.FC<SportDisplayProps> = ({
  summary,
  collapsed = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(false);
  });

  return (
    <Card>
      <CardContent style={{ width: "100%" }}>
        {summary ? (
          <>
            {summary && !collapsed ? (
              <div style={{ textAlign: "center" }}>
                <h4>Football Fixtures</h4>
              </div>
            ) : (
              <Table>
                <TableRow>
                  <TableCell>
                    <h4>Football Fixtures</h4>
                  </TableCell>
                  <SummaryCell />
                  <SummaryCell />
                </TableRow>
              </Table>
            )}
          </>
        ) : (
          <>
            {isLoading ? (
              <div className="loading-spinner">
                <CircularProgress />
              </div>
            ) : errorMessage ? (
              <div className="error-message">
                <Typography variant="body1" color="error">
                  {errorMessage}
                </Typography>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SportDisplay;
