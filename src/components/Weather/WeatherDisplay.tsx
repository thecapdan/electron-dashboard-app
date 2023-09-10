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

import { tableStyle } from "./weather-utils";

import TemperatureCell from "./TemperatureCell";
import RainCell from "./RainCell";
import SummaryCell from "./SummaryCell";

import { CircularProgress } from "@mui/material";

const mockData = require("./mock-weather-data.json");

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
    };
    pop: number;
  }[];
}

const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

interface WeatherDisplayProps {
  summary: boolean;
  collapsed?: boolean;
}

const subHeaderStyle = {
  textAlign: "center",
};

const getWeatherDataPoints = (data: WeatherData) => {
  const today = data.list[0];
  const tomorrow = data.list[1];

  const weatherDataPoints = {
    temperatureToday9am: Math.round(today.main.temp),
    likelihoodOfRainToday9am: Math.round(today.pop),
    temperatureToday4pm: Math.round(data.list[3].main.temp),
    likelihoodOfRainToday4pm: Math.round(data.list[3].pop),
    temperatureTomorrow9am: Math.round(tomorrow.main.temp),
    likelihoodOfRainTomorrow9am: Math.round(tomorrow.pop),
    temperatureTomorrow4pm: Math.round(data.list[7].main.temp),
    likelihoodOfRainTomorrow4pm: Math.round(data.list[7].pop),
  };

  return weatherDataPoints;
};
const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  summary,
  collapsed = false,
}) => {
  const [weatherData, setWeatherData] = useState<{
    temperatureToday9am: number | null;
    likelihoodOfRainToday9am: number | null;
    temperatureToday4pm: number | null;
    likelihoodOfRainToday4pm: number | null;
    temperatureTomorrow9am: number | null;
    likelihoodOfRainTomorrow9am: number | null;
    temperatureTomorrow4pm: number | null;
    likelihoodOfRainTomorrow4pm: number | null;
  }>({
    temperatureToday9am: null,
    likelihoodOfRainToday9am: null,
    temperatureToday4pm: null,
    likelihoodOfRainToday4pm: null,
    temperatureTomorrow9am: null,
    likelihoodOfRainTomorrow9am: null,
    temperatureTomorrow4pm: null,
    likelihoodOfRainTomorrow4pm: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeatherData() {
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

            // for testing
            let londonData = mockData;
            let dataPoints = getWeatherDataPoints(londonData);
            setWeatherData(dataPoints);

            // const parsedData = JSON.parse(cachedWeatherData);
            // let dataPoints = getWeatherDataPoints(parsedData);
            // setWeatherData(dataPoints);

            setIsLoading(false);
            setErrorMessage(null);

            return;
          }
        }

        // If cached data is not available or is older than 4 hour, fetch new data
        console.log("FETCHING DATA");
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=London,GB&appid=${apiKey}&units=metric` // Request temperature in Celsius
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();

        const dataPoints = getWeatherDataPoints(data);
        setWeatherData(dataPoints);

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

  console.log(weatherData);

  return (
    <Card>
      <CardContent style={{ minWidth: "1000px" }}>
        {summary ? (
          summary && !collapsed ? (
            <div style={{ textAlign: "center" }}>
              <h1>Weather Forecast</h1>
            </div>
          ) : (
            <Table>
              <TableRow>
                <TableCell>Temp</TableCell>
                <SummaryCell
                  temperature={weatherData.temperatureToday9am ?? NaN}
                  percentageChance={weatherData.likelihoodOfRainToday9am ?? NaN}
                  time="Today  (am)"
                />
                <SummaryCell
                  time="Today  (am)"
                  temperature={weatherData.temperatureToday4pm ?? NaN}
                  percentageChance={weatherData.likelihoodOfRainToday4pm ?? NaN}
                />
                <SummaryCell
                  time="Tomorrow  (am)"
                  temperature={weatherData.temperatureTomorrow9am ?? NaN}
                  percentageChance={
                    weatherData.likelihoodOfRainTomorrow9am ?? NaN
                  }
                />
                <SummaryCell
                  time="Tomorrow  (pm)"
                  temperature={weatherData.temperatureTomorrow4pm ?? NaN}
                  percentageChance={
                    weatherData.likelihoodOfRainTomorrow4pm ?? NaN
                  }
                />
              </TableRow>
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
                      temperature={weatherData.temperatureToday9am ?? NaN}
                    />
                    <TemperatureCell
                      temperature={weatherData.temperatureToday4pm ?? NaN}
                    />
                    <TemperatureCell
                      temperature={weatherData.temperatureTomorrow9am ?? NaN}
                    />
                    <TemperatureCell
                      temperature={weatherData.temperatureTomorrow4pm ?? NaN}
                    />
                  </TableRow>
                  <TableRow>
                    <TableCell>Rain</TableCell>

                    <RainCell
                      percentageChance={
                        weatherData.likelihoodOfRainToday9am ?? NaN
                      }
                    />
                    <RainCell
                      percentageChance={
                        weatherData.likelihoodOfRainToday4pm ?? NaN
                      }
                    />
                    <RainCell
                      percentageChance={
                        weatherData.likelihoodOfRainTomorrow9am ?? NaN
                      }
                    />
                    <RainCell
                      percentageChance={
                        weatherData.likelihoodOfRainTomorrow4pm ?? NaN
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
