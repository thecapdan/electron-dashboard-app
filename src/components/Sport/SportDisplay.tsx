import React from "react";
import { Card, CardContent } from "@mui/material";

interface SportDisplayProps {
  summary: boolean;
}

const SportDisplay: React.FC<SportDisplayProps> = ({ summary }) => {
  return (
    <Card>
      <CardContent>
        {summary ? (
          <div>
            <h4>Sport Summary</h4>
          </div>
        ) : (
          <div>
            <h4>Sport Content</h4>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SportDisplay;
