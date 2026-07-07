import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";
import { RollHistoryItem } from "@/types/game.types";

interface GameStatusAlertProps {
  error: string | null;
  lastResult: RollHistoryItem | null;
}

export const GameStatusAlert: React.FC<GameStatusAlertProps> = ({
  error,
  lastResult,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {error && (
        <Box
          sx={{
            backgroundColor: "red",
            color: "#fff",
            p: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <ErrorIcon />
          <Typography variant="body1">{error}</Typography>
        </Box>
      )}

      {lastResult && (
        <Box
          sx={{
            backgroundColor: lastResult.isWin ? "#2e7d32" : "#c62828",
            color: "#fff",
            p: 2,
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {lastResult.isWin ? (
              <CheckCircleIcon fontSize="small" />
            ) : (
              <ErrorIcon fontSize="small" />
            )}
            <Typography variant="subtitle1" fontWeight={600}>
              {lastResult.isWin ? "You won" : "You lost"}
            </Typography>
          </Box>
          {!lastResult.isWin && (
            <Typography variant="body2" sx={{ opacity: 0.9, pl: 3.5 }}>
              Number was{" "}
              {lastResult.condition === "greater" ? "lower" : "higher"}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
