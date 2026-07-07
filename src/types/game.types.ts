export type Condition = "greater" | "less";

export interface RollHistoryItem {
  id: string;
  threshold: number;
  condition: Condition;
  result: number;
  isWin: boolean;
}