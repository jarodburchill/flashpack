import { IFlashcard } from "./Flashcard";
import { IGroup } from "./Group";
import { IPack } from "./Pack";
import { IQuizcard } from "./Quizcard";

export interface ISchema {
  cards: Array<IFlashcard | IQuizcard>;
  darkMode: boolean;
  groups: Array<IGroup>;
  nextId: number;
  packs: Array<IPack>;
}
