export interface INewPack {
  readonly type: "flash" | "quiz";
  name: string;
  timed: boolean;
  liveResults: boolean;
}
export interface IPack extends INewPack {
  readonly id: number;
  readonly groupId: number;
}
