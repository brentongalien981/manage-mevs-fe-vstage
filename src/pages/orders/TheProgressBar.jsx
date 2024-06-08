import React, { useState } from "react";
import My from "../../utils/My";
import { ProgressBar } from "react-bootstrap";

const TheProgressBar = () => {
  const [progressBarValue, setProgressBarValue] = useState(0);

  // Animate the bar.
  const randomIntervalMs = My.getRandomNumber(10, 800);
  const interval = setInterval(() => {
    setProgressBarValue((previousValue) => {
      let updatedValue = previousValue + My.getRandomNumber(1, 10);
      if (updatedValue >= 99) {
        updatedValue = previousValue;
        setTimeout(() => {
          My.log("Clearing <TheProgressBar /> interval...");
          clearInterval(interval);
        }, 2000);
      }

      // My.log(`Interval ms ==> ${randomIntervalMs}`);
      // My.log(`Progress Bar Value ==> ${updatedValue}`);
      return updatedValue;
    });
  }, randomIntervalMs);

  return (
    <ProgressBar
      className="mb-3"
      striped
      animated
      variant="primary"
      now={progressBarValue}
      label="Querying Orders"
    />
  );
};

export default TheProgressBar;
