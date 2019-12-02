import { IFlashcard } from "./Flashcard";
import { IGroup } from "./Group";
import { IPack } from "./Pack";
import { IQuizcard } from "./Quizcard";

export type Card = IFlashcard | IQuizcard;

export interface ISchema {
  darkMode: boolean;
  nextId: number;
  groups: IGroup[];
  packs: IPack[];
  cards: Card[];
}
