import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const DownCounter = () => {
  const deadline = "August, 28, 2023";
  const calculateTimeRemaining = (deadline) => {
    const currentTime = new Date().getTime();
    const targetTime = new Date(deadline).getTime();
    const timeRemaining = targetTime - currentTime;
    return Math.max(timeRemaining, 0);
  };

  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(deadline)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = calculateTimeRemaining(deadline);
      setTimeRemaining(remaining);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [deadline]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    // return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    return (
      <>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            textAlign: "center",
            gap: "20px 0px",
            fontFamily: "Rubik",
          }}
        >
          <Box sx={{ background: "#fff", borderRadius: "8px", px: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {days < 10 ? "0" + days : days}
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>Days</Typography>
          </Box>
          <Box sx={{ background: "#fff", borderRadius: "8px", px: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {hours < 10 ? "0" + hours : hours}
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>Hours</Typography>
          </Box>
          <Box sx={{ background: "#fff", borderRadius: "8px", px: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {minutes < 10 ? "0" + minutes : minutes}
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>Minutes</Typography>
          </Box>
          <Box sx={{ background: "#fff", borderRadius: "8px", px: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {seconds < 10 ? "0" + seconds : seconds}
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>Seconds</Typography>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <div>
      <p>{formatTime(timeRemaining)}</p>
    </div>
  );
};

export default DownCounter;
