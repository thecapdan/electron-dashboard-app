import React, { useState, useEffect } from "react";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { TableCell, Table, TableBody, TableRow } from "@mui/material";
import SummaryCell from "./SummaryCell";
import { deepEqual, LocalStorageManager } from "../../common/utils";

interface TravelDisplayProps {
  summary: boolean;
  collapsed?: boolean;
}

const TravelDisplay: React.FC<TravelDisplayProps> = ({
  summary,
  collapsed = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<
    { name: string; status: any; disruption: any }[]
  >([]);

  const handleStatusUpdate = (
    newStatuses: { name: string; status: any; disruption: any }[]
  ) => {
    // Check if the newStatuses is different from the current statuses
    if (!deepEqual(newStatuses, statuses)) {
      // Update the statuses state only if they are different
      setStatuses(newStatuses);
    }
  };

  useEffect(() => {
    async function fetchTravelData() {
      try {
        const cachedData = LocalStorageManager.checkLocalStorage<string>(
          "Travel",
          1
        );

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          handleStatusUpdate(parsedData);
          setIsLoading(false);
          setErrorMessage(null);
          console.log("TRAVEL: Using cached data");
          return;
        }

        console.log("TRAVEL: Fetching data from API");
        const response = await fetch(
          `https://api.tfl.gov.uk/line/mode/tube,dlr,elizabeth-line/status`
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        const lineStatuses:
          | ((prevState: never[]) => never[])
          | { name: string; status: any; disruption: any }[] = [];

        // Iterate through the response array and find the statuses for "dlr" and "jubilee" lines
        data.forEach(
          (line: {
            id: string;
            lineStatuses: {
              disruption: any;
              statusSeverityDescription: any;
            }[];
          }) => {
            if (line.id === "dlr") {
              lineStatuses.push({
                name: "dlr",
                status: line.lineStatuses[0].statusSeverityDescription,
                disruption: line.lineStatuses[0].disruption,
              });
            } else if (line.id === "jubilee") {
              lineStatuses.push({
                name: "jubilee",
                status: line.lineStatuses[0].statusSeverityDescription,
                disruption: line.lineStatuses[0].disruption,
              });
            } else if (line.id === "elizabeth") {
              lineStatuses.push({
                name: "elizabeth",
                status: line.lineStatuses[0].statusSeverityDescription,
                disruption: line.lineStatuses[0].disruption,
              });
            }
          }
        );

        handleStatusUpdate(lineStatuses);

        LocalStorageManager.keepInLocalStorage(
          "Travel",
          JSON.stringify(lineStatuses)
        );

        setIsLoading(false);
        setErrorMessage(null);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("Error fetching travel data");
      }
    }
    fetchTravelData();
  });

  return (
    <Card>
      <CardContent style={{ width: "100%" }}>
        {summary ? (
          <>
            {summary && !collapsed ? (
              <div style={{ textAlign: "center" }}>
                <h4>Travel Status</h4>
              </div>
            ) : (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <h4>Travel Status</h4>
                    </TableCell>
                    <SummaryCell lineStatus={statuses[0]} />
                    <SummaryCell lineStatus={statuses[1]} />
                    <SummaryCell lineStatus={statuses[2]} />
                  </TableRow>
                </TableBody>
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

export default TravelDisplay;
