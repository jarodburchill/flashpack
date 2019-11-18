import { IFlashcard } from "./Flashcard";
import { IGroup } from "./Group";
import { IPack } from "./Pack";
import { IQuizcard } from "./Quizcard";

type Types = (IFlashcard | IQuizcard)[] | boolean | IGroup[] | number | IPack[];
export interface ISchema {
  [index: string]: Types;
  cards: (IFlashcard | IQuizcard)[];
  darkMode: boolean;
  groups: IGroup[];
  nextId: number;
  packs: IPack[];
}
