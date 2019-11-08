import { ICards } from "./Cards";
import { IGroups } from "./Groups";
import { IPacks } from "./Packs";

export interface ISchema {
  darkMode: boolean;
  groups: IGroups;
  packs: IPacks;
  cards: ICards;
}
