import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";

import { tableStyle } from "../../common/styles";

import TemperatureCell from "./TemperatureCell";
import RainCell from "./RainCell";
import SummaryCell from "./SummaryCell";

import { CircularProgress } from "@mui/material";

import { transformWeatherData } from "./weather-utils";

const mockData = require("./mock-weather-data-two.json");

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
interface WeatherDisplayProps {
  summary: boolean;
  collapsed?: boolean;
}

const subHeaderStyle = {
  textAlign: "center",
};

type WeatherDataPoints = {
  today9am: {
    temperature: number | null;
    percentageChanceOfRain: number | null;
  };
  today4pm: {
    temperature: number | null;
    percentageChanceOfRain: number | null;
  };
  tomorrow9am: {
    temperature: number | null;
    percentageChanceOfRain: number | null;
  };
  tomorrow4pm: {
    temperature: number | null;
    percentageChanceOfRain: number | null;
  };
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  summary,
  collapsed = false,
}) => {
  const [weatherDataPoints, setWeatherDataPoints] = useState<WeatherDataPoints>(
    {
      today9am: {
        temperature: null,
        percentageChanceOfRain: null,
      },
      today4pm: {
        temperature: null,
        percentageChanceOfRain: null,
      },
      tomorrow9am: {
        temperature: null,
        percentageChanceOfRain: null,
      },
      tomorrow4pm: {
        temperature: null,
        percentageChanceOfRain: null,
      },
    }
  );

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeatherData() {
      if (apiKey === undefined || process.env.REACT_APP_USE_MOCKS === "true") {
        let londonData = mockData;
        let dataPoints = transformWeatherData(londonData);
        setWeatherDataPoints(dataPoints);

        setIsLoading(false);
        setErrorMessage(null);
        return;
      }

      try {
        const cachedWeatherData = localStorage.getItem("weatherData");
        const cachedTimestamp = localStorage.getItem("weatherTimestamp");

        if (cachedWeatherData && cachedTimestamp) {
          const currentTime = new Date().getTime();
          const lastFetchTime = new Date(parseInt(cachedTimestamp)).getTime();
          const timeDifferenceInHours =
            (currentTime - lastFetchTime) / (1000 * 60 * 60);

          if (timeDifferenceInHours < 4) {
            // Data is less than 4 hours old, use cached data
            console.log("Using cached weather data");

            const parsedData = JSON.parse(cachedWeatherData);
            setWeatherDataPoints(parsedData);

            setIsLoading(false);
            setErrorMessage(null);

            return;
          }
        }

        // If cached data is not available or is older than 4 hour, fetch new data
        console.log("FETCHING WEATHER DATA");
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=London&days=2&aqi=no&alerts=no`
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }
        const data = await response.json();

        const dataPoints = transformWeatherData(data);
        setWeatherDataPoints(dataPoints);

        localStorage.setItem("weatherData", JSON.stringify(dataPoints));

        localStorage.setItem(
          "weatherTimestamp",
          new Date().getTime().toString()
        );

        setIsLoading(false);
        setErrorMessage(null);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("API request not authorized");
      }
    }

    fetchWeatherData();
  }, []);

  return (
    <Card>
      <CardContent style={{ width: "100%" }}>
        {summary ? (
          summary && !collapsed ? (
            <div style={{ textAlign: "center" }}>
              <h4>Weather Forecast</h4>
            </div>
          ) : (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <h4>Weather Forecast</h4>
                  </TableCell>
                  <SummaryCell
                    temperature={weatherDataPoints.today9am?.temperature ?? NaN}
                    percentageChance={
                      weatherDataPoints.today9am?.percentageChanceOfRain ?? NaN
                    }
                    time="Today  (am)"
                  />
                  <SummaryCell
                    time="Today  (am)"
                    temperature={weatherDataPoints.today4pm?.temperature ?? NaN}
                    percentageChance={
                      weatherDataPoints.today4pm?.percentageChanceOfRain ?? NaN
                    }
                  />
                  <SummaryCell
                    time="Tomorrow  (am)"
                    temperature={
                      weatherDataPoints.tomorrow9am?.temperature ?? NaN
                    }
                    percentageChance={
                      weatherDataPoints.tomorrow9am?.percentageChanceOfRain ??
                      NaN
                    }
                  />
                  <SummaryCell
                    time="Tomorrow  (pm)"
                    temperature={
                      weatherDataPoints.tomorrow4pm?.temperature ?? NaN
                    }
                    percentageChance={
                      weatherDataPoints.tomorrow4pm?.percentageChanceOfRain ??
                      NaN
                    }
                  />
                </TableRow>
              </TableBody>
            </Table>
          )
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell colSpan={2} sx={tableStyle.cell}>
                      TODAY
                    </TableCell>
                    <TableCell colSpan={2} sx={tableStyle.cell}>
                      TOMORROW
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell sx={subHeaderStyle}>AM</TableCell>
                    <TableCell sx={subHeaderStyle}>PM</TableCell>
                    <TableCell sx={subHeaderStyle}>AM</TableCell>
                    <TableCell sx={subHeaderStyle}>PM</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Temp</TableCell>
                    <TemperatureCell
                      temperature={
                        weatherDataPoints.today9am?.temperature ?? NaN
                      }
                    />
                    <TemperatureCell
                      temperature={
                        weatherDataPoints.today4pm?.temperature ?? NaN
                      }
                    />
                    <TemperatureCell
                      temperature={
                        weatherDataPoints.tomorrow9am?.temperature ?? NaN
                      }
                    />
                    <TemperatureCell
                      temperature={
                        weatherDataPoints.tomorrow4pm?.temperature ?? NaN
                      }
                    />
                  </TableRow>
                  <TableRow>
                    <TableCell>Rain</TableCell>

                    <RainCell
                      percentageChance={
                        weatherDataPoints.today9am?.percentageChanceOfRain ??
                        NaN
                      }
                    />
                    <RainCell
                      percentageChance={
                        weatherDataPoints.today4pm?.percentageChanceOfRain ??
                        NaN
                      }
                    />
                    <RainCell
                      percentageChance={
                        weatherDataPoints.tomorrow9am?.percentageChanceOfRain ??
                        NaN
                      }
                    />
                    <RainCell
                      percentageChance={
                        weatherDataPoints.tomorrow4pm?.percentageChanceOfRain ??
                        NaN
                      }
                    />
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
