import { IFlashcard } from "./Flashcard";
import { IQuizcard } from "./Quizcard";

export interface ICards extends Array<IQuizcard | IFlashcard> {}
