import { ICards } from "./Cards";
import { IGroups } from "./Groups";
import { IPacks } from "./Packs";

export interface ISchema {
  cards: ICards;
  darkMode: boolean;
  groups: IGroups;
  packs: IPacks;
}
