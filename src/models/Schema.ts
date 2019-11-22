import { IFlashcard } from "./Flashcard";
import { IGroup } from "./Group";
import { IPack } from "./Pack";
import { IQuizcard } from "./Quizcard";

export interface ISchema {
  cards: (IFlashcard | IQuizcard)[];
  darkMode: boolean;
  groups: IGroup[];
  nextId: number;
  packs: IPack[];
}
