import { Card } from "global";
import { IGroup } from "./Group";
import { IPack } from "./Pack";

export interface ISchema {
  darkMode: boolean;
  nextId: number;
  groups: IGroup[];
  packs: IPack[];
  cards: Card[];
}
