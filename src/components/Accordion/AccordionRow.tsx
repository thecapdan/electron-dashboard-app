import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface AccordionRowProps {
  expanded: boolean;
  onChange: (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  panelKey: string;
  summaryContent: React.ReactNode;
  detailsContent: React.ReactNode;
}

function AccordionRow({
  expanded,
  onChange,
  panelKey,
  summaryContent,
  detailsContent,
}: AccordionRowProps) {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${panelKey}-content`}
        id={`${panelKey}-header`}
        style={{ width: "100%" }}
      >
        {summaryContent}
      </AccordionSummary>
      <AccordionDetails>{detailsContent}</AccordionDetails>
    </Accordion>
  );
}

export default AccordionRow;
