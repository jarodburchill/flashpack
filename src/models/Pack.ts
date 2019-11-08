export interface IPack {
  id: number;
  groupId: number;
  name: string;
  type: "flash" | "quiz";
  timed: boolean;
  liveResults: boolean;
}
