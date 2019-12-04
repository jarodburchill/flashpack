import { PackType } from "global";

export interface INewPack {
  readonly type: PackType;
  name: string;
  timed: boolean;
  liveResults: boolean;
}
export interface IPack extends INewPack {
  readonly id: number;
  readonly groupId: number;
}
