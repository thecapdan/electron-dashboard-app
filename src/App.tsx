import React, { useState } from "react";
import "./App.css";
import WeatherDisplay from "./components/Weather/WeatherDisplay";
import SportDisplay from "./components/Sport/SportDisplay";
import TravelDisplay from "./components/Travel/TravelDisplay";
import AccordionRow from "./components/Accordion/AccordionRow";

import { AppBar, Toolbar, Typography } from "@mui/material";

export default function App() {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
    null
  );

  const handleAccordionChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : null);
    };

  return (
    <div style={{ width: "800px", height: "800px" }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 0 }}>
            DASHBOARD
          </Typography>
        </Toolbar>
      </AppBar>
      <AccordionRow
        expanded={expandedAccordion === "weather"}
        onChange={handleAccordionChange("weather")}
        panelKey="weather"
        summaryContent={
          <WeatherDisplay
            summary={true}
            collapsed={expandedAccordion !== "weather"}
          />
        }
        detailsContent={<WeatherDisplay summary={false} />}
      />
      <AccordionRow
        expanded={expandedAccordion === "sport"}
        onChange={handleAccordionChange("sport")}
        panelKey="sport"
        summaryContent={
          <SportDisplay
            summary={true}
            collapsed={expandedAccordion !== "sport"}
          />
        }
        detailsContent={<SportDisplay summary={false} />}
      />
      <AccordionRow
        expanded={expandedAccordion === "travel"}
        onChange={handleAccordionChange("travel")}
        panelKey="travel"
        summaryContent={
          <TravelDisplay
            summary={true}
            collapsed={expandedAccordion !== "travel"}
          />
        }
        detailsContent={<TravelDisplay summary={false} />}
      />
    </div>
  );
}
