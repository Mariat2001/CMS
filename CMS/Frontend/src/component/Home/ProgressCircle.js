import { Box, useTheme } from "@mui/material";


import React from 'react'

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
    const angle = progress * 360;
  return (
    <Box
    sx={{
      background: `radial-gradient(grey 55%, transparent 56%),
          conic-gradient(transparent 0deg ${angle}deg, grey} ${angle}deg 360deg),
          grey}`,
      borderRadius: "50%",
      width: `${size}px`,
      height: `${size}px`,
    }}
  />
  )
}

export default ProgressCircle;
