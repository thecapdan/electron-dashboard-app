import React, { useState, useEffect } from "react";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { TableCell, Table, TableBody, TableRow } from "@mui/material";
import SummaryCell from "./SummaryCell";
import axios from "axios";
import { Fixture } from "./sport-utils";
const mockData = require("./mock-sports-data.json");

interface SportDisplayProps {
  summary: boolean;
  collapsed?: boolean;
}

const apiKey = process.env.REACT_APP_SPORTS_API_KEY || "";

const SportDisplay: React.FC<SportDisplayProps> = ({
  summary,
  collapsed = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    const fetchFixtures = async () => {
      const apiUrl = "https://v3.football.api-sports.io/fixtures";

      if (process.env.REACT_APP_USE_MOCKS === "true") {
        setFixtures(mockData);
        setIsLoading(false);
        setErrorMessage(null);
        return;
      }

      try {
        const cachedFixturesData = localStorage.getItem("fixturesData");
        const cachedTimestamp = localStorage.getItem("fixturesTimestamp");

        if (cachedFixturesData && cachedTimestamp) {
          const currentTime = new Date();
          const lastFetchTime = new Date(parseInt(cachedTimestamp));

          if (lastFetchTime.getDate() === currentTime.getDate()) {
            const parsedData = JSON.parse(cachedFixturesData);
            setFixtures(parsedData.response);

            setIsLoading(false);
            setErrorMessage(null);
            return;
          }
        }

        const currentDate = new Date().toISOString().split("T")[0];
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
        const oneWeekFromNowFormatted = oneWeekFromNow
          .toISOString()
          .split("T")[0];

        const response = await axios.get(apiUrl, {
          headers: {
            "x-apisports-key": apiKey,
          },
          params: {
            season: "2023",
            team: "42",
            from: currentDate,
            to: oneWeekFromNowFormatted,
          },
        });
        console.log(JSON.stringify(response));
        if (response.status === 200) {
          const fixturesData = response.data;
          // Process the fixtures data here
          setFixtures(fixturesData.response);

          localStorage.setItem("fixturesData", JSON.stringify(fixturesData));

          localStorage.setItem(
            "fixturesTimestamp",
            new Date().getTime().toString()
          );
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  return (
    <Card>
      <CardContent style={{ width: "100%" }}>
        {summary && !collapsed && (
          <div style={{ textAlign: "center" }}>
            <h4>Football Fixtures</h4>
          </div>
        )}

        {summary && !collapsed ? (
          <></>
        ) : (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <h4>Football Fixtures</h4>
                </TableCell>
                {fixtures.slice(0, 2).map((fixture, index) => (
                  <SummaryCell key={index} fixture={fixture} />
                ))}
              </TableRow>
            </TableBody>
          </Table>
        )}

        {!summary && (
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
