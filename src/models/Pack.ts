export interface INewPack {
  name: string;
  type: "flash" | "quiz";
  timed: boolean;
  liveResults: boolean;
}
export interface IPack extends INewPack {
  readonly id: number;
  readonly groupId: number;
}
