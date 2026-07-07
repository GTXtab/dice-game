import React from "react";
import { Box, Typography } from "@mui/material";

interface DiceDisplayProps {
  result: number | undefined;
}

export const DiceDisplay: React.FC<DiceDisplayProps> = ({ result }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        py: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: '5px',
        width: '300px',
        marginX: 'auto',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "5.5rem",
          fontWeight: 400,
          color: "#212121",
          letterSpacing: -1,
        }}
      >
        {result !== undefined ? result : "—"}
      </Typography>
    </Box>
  );
};