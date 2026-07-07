import React from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  Button,
  CircularProgress,
} from "@mui/material";
import { Condition } from "@/types/game.types";

interface GameControlsProps {
  threshold: string;
  setThreshold: (value: string) => void;
  condition: Condition;
  setCondition: (value: Condition) => void;
  isLoading: boolean;
  isButtonDisabled: boolean;
  play: () => Promise<void>;
}

export const GameControls: React.FC<GameControlsProps> = ({
  threshold,
  setThreshold,
  condition,
  setCondition,
  isLoading,
  isButtonDisabled,
  play,
}) => {
  const handleConditionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCondition(event.target.value as Condition);
  };

  const handleSliderChange = (
    _event: Event | React.SyntheticEvent,
    value: number | number[],
  ) => {
    setThreshold(String(value));
  };

  const numericThreshold = Number(threshold) || 50;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        <RadioGroup
          row
          value={condition}
          onChange={handleConditionChange}
          sx={{ gap: 4 }}
        >
          <FormControlLabel
            value="less"
            control={
              <Radio
                color="secondary"
                sx={{ "&.Mui-checked": { color: "#9c27b0" } }}
              />
            }
            label={
              <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                Under
              </Typography>
            }
            labelPlacement="start"
          />
          <FormControlLabel
            value="greater"
            control={
              <Radio
                color="secondary"
                sx={{ "&.Mui-checked": { color: "#9c27b0" } }}
              />
            }
            label={
              <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                Over
              </Typography>
            }
            labelPlacement="start"
          />
        </RadioGroup>
      </Box>

      <Box sx={{ px: 2, mt: 2, position: "relative" }}>
        <Slider
          value={numericThreshold}
          onChange={handleSliderChange}
          min={0}
          max={100}
          marks={[
            { value: 0 },
            { value: 20 },
            { value: 40 },
            { value: 60 },
            { value: 80 },
            { value: 100 },
          ]}
          valueLabelDisplay="on"
          sx={{
            color: "#9c27b0",
            height: 4,
            mt: 5,
            padding: "15px 0",

            "& .MuiSlider-track": {
              border: "none",
              height: 4,
              backgroundColor: "#9c27b0",
            },

            "& .MuiSlider-rail": {
              backgroundColor: "rgba(156, 39, 176, 0.24)",
              opacity: 1,
              height: 4,
            },

            "& .MuiSlider-mark": {
              backgroundColor: "#9c27b0",
              width: 4,
              height: 4,
              borderRadius: "50%",
              opacity: 0.5,
              top: "50%",
              transform: "translate(-2px, -50%)",

              "&.MuiSlider-markActive": {
                backgroundColor: "#fff",
                opacity: 0.9,
              },
            },

            "& .MuiSlider-markLabel": {
              display: "none",
            },

            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              backgroundColor: "#9c27b0",
              boxShadow: "0px 0px 0px 10px rgba(156, 39, 176, 0.12)",
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "0px 0px 0px 14px rgba(156, 39, 176, 0.2)",
              },
            },

            "& .MuiSlider-valueLabel": {
              lineHeight: 1.2,
              fontSize: "0.9rem",
              background: "#6e6e6e",
              borderRadius: "8px",
              p: "6px 12px",
              fontWeight: 600,
              top: -10,
              transform: "translateY(-100%) scale(1) !important",
              "&::before": {
                display: "none",
              },

              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -5,
                left: "50%",
                transform: "translateX(-50%)",
                borderWidth: "5px 5px 0",
                borderStyle: "solid",
                borderColor: "#6e6e6e transparent transparent",
              },

              "& *": {
                background: "transparent",
                color: "#fff",
              },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ flexGrow: 1 }}
          >
            0
          </Typography>
          <Typography variant="caption" color="textSecondary">
            100
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={play}
        disabled={isButtonDisabled}
        sx={{
          backgroundColor: "#9c27b0",
          color: "#fff",
          py: 1.5,
          fontWeight: 600,
          fontSize: "1rem",
          textTransform: "uppercase",
          "&:hover": { backgroundColor: "#7b1fa2" },
          "&.Mui-disabled": {
            backgroundColor: isLoading ? "#9c27b0" : "rgba(156, 39, 176, 0.4)",
            color: "rgba(255, 255, 255, 0.8)",
          },
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Play"}
      </Button>
    </Box>
  );
};
