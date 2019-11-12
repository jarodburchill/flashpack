export interface IPack {
  readonly id: number;
  readonly groupId: number;
  name: string;
  type: "flash" | "quiz";
  timed: boolean;
  liveResults: boolean;
}
