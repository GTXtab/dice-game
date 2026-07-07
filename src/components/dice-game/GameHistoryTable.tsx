import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Condition, RollHistoryItem } from "@/types/game.types";
import { formatTime } from "@/utils/formatTime";

const CONDITION_MAP: Record<Condition, string> = {
  greater: "Over",
  less: "Under",
};

interface GameHistoryTableProps {
  history: RollHistoryItem[];
}

export const GameHistoryTable: React.FC<GameHistoryTableProps> = ({
  history,
}) => {
  return (
    <TableContainer sx={{ mt: 2, maxHeight: 380, overflowY: "auto" }}>
      <Table size="small" aria-label="game history table">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                borderBottom: "1px solid #e0e0e0",
                fontWeight: 600,
                color: "#757575",
                pb: 1,
                px: 1,
              },
            }}
          >
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Guess</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.slice(0, 10).map((item) => (
            <TableRow
              key={item.id}
              sx={{
                "& td": {
                  borderBottom: "1px solid #f5f5f5",
                  py: 1.2,
                  px: 1,
                },
              }}
            >
              <TableCell
                align="left"
                sx={{ color: "#757575", fontSize: "0.875rem" }}
              >
                {formatTime(item.id)}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#212121", fontSize: "0.875rem" }}
              >
                {`${CONDITION_MAP[item.condition]} ${item.threshold}`}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: item.isWin ? "#2e7d32" : "#d32f2f",
                }}
              >
                {item.result}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
