import type { NextApiRequest, NextApiResponse } from "next";
import { Condition } from "@/types/game.types";
import { MAX_ROLL, MIN_ROLL } from "@/utils/const";

interface RollRequestBody {
  threshold: number;
  condition: Condition;
}

interface RollResponseBody {
  result: number;
  isWin: boolean;
}

interface ErrorResponseBody {
  message: string;
}

function rollDice(): number {
  return Math.floor(Math.random() * (MAX_ROLL - MIN_ROLL + 1)) + MIN_ROLL;
}

function checkWin(
  result: number,
  threshold: number,
  condition: Condition,
): boolean {
  return condition === "greater" ? result > threshold : result < threshold;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RollResponseBody | ErrorResponseBody>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }

  const { threshold, condition } = req.body as Partial<RollRequestBody>;

  if (
    typeof threshold !== "number" ||
    Number.isNaN(threshold) ||
    threshold < MIN_ROLL ||
    threshold > MAX_ROLL
  ) {
    return res.status(400).json({
      message: `threshold must be a number between ${MIN_ROLL} and ${MAX_ROLL}`,
    });
  }

  if (condition !== "greater" && condition !== "less") {
    return res
      .status(400)
      .json({ message: "The condition must be “greater” or “less”" });
  }

  const result = rollDice();
  const isWin = checkWin(result, threshold, condition);

  return res.status(200).json({ result, isWin });
}
