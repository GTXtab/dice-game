import React from "react";
import { Box } from "@mui/material";
import { useDiceGame } from "@/hooks/useDiceGame";
import { DiceDisplay, GameControls, GameHistoryTable, GameStatusAlert } from "./dice-game";

export default function DiceGame() {
  const {
    threshold,
    setThreshold,
    condition,
    setCondition,
    lastResult,
    history,
    isLoading,
    isButtonDisabled,
    play,
    error,
  } = useDiceGame();

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <GameStatusAlert error={error} lastResult={lastResult} />

      <DiceDisplay result={lastResult?.result} />

      <GameControls
        threshold={threshold}
        setThreshold={setThreshold}
        condition={condition}
        setCondition={setCondition}
        isLoading={isLoading}
        isButtonDisabled={isButtonDisabled}
        play={play}
      />

      {history.length > 0 && <GameHistoryTable history={history} />}
    </Box>
  );
}