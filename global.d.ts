import { IFlashcard } from "./src/models/Flashcard";
import { IQuizcard } from "./src/models/Quizcard";

export type Card = IFlashcard | IQuizcard;
export type PackType = "flash" | "quiz";
