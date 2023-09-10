import React from "react";
import { Card, CardContent } from "@mui/material";

interface TravelDisplayProps {
  summary: boolean;
}

const TravelDisplay: React.FC<TravelDisplayProps> = ({ summary }) => {
  return (
    <Card>
      <CardContent>
        {summary ? (
          <div>
            <h4>Travel Summary</h4>
          </div>
        ) : (
          <div>
            <h4>Travel Content</h4>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TravelDisplay;
