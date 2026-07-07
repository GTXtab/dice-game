import { useCallback, useState, useEffect } from "react";
import { MAX_HISTORY_LENGTH, MAX_ROLL, MIN_ROLL } from "@/utils/const";
import { Condition, RollHistoryItem } from "@/types/game.types";

interface UseDiceGameReturn {
  threshold: string;
  setThreshold: (value: string) => void;
  condition: Condition;
  setCondition: (value: Condition) => void;
  lastResult: RollHistoryItem | null;
  history: RollHistoryItem[];
  canPlay: boolean;
  isLoading: boolean;
  isButtonDisabled: boolean;
  play: () => Promise<void>;
  error: string | null;
}

interface RollApiResponse {
  result: number;
  isWin: boolean;
}

export function useDiceGame(): UseDiceGameReturn {
  const [threshold, setThreshold] = useState<string>("50");
  const [condition, setCondition] = useState<Condition>("greater");
  const [history, setHistory] = useState<RollHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isThrottled, setIsThrottled] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setIsThrottled(true);
      return;
    }

    if (isThrottled) {
      const timer = setTimeout(() => {
        setIsThrottled(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isThrottled]);

  const numericThreshold = Number(threshold);

  const canPlay =
    threshold.trim() !== "" &&
    !Number.isNaN(numericThreshold) &&
    numericThreshold >= MIN_ROLL &&
    numericThreshold <= MAX_ROLL;

  const isButtonDisabled = !canPlay || isLoading || isThrottled;

  const play = useCallback(async () => {
    if (!canPlay || isLoading || isThrottled) return;

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/roll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threshold: numericThreshold, condition }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Unable to retrieve the throw result");
      }

      const data: RollApiResponse = await response.json();

      const newEntry: RollHistoryItem = {
        id: `${Date.now()}-${data.result}`,
        threshold: numericThreshold,
        condition,
        result: data.result,
        isWin: data.isWin,
      };

      setHistory((prev) => [newEntry, ...prev].slice(0, MAX_HISTORY_LENGTH));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [canPlay, isLoading, isThrottled, condition, numericThreshold]);

  return {
    threshold,
    setThreshold,
    condition,
    setCondition,
    lastResult: history[0] ?? null,
    history,
    canPlay,
    isLoading,
    isButtonDisabled,
    play,
    error,
  };
}
