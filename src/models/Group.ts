export interface INewGroup {
  name: string;
}
export interface IGroup extends INewGroup {
  readonly id: number;
}
