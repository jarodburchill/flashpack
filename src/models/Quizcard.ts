import { IQuizAnswer } from "./QuizAnswer";

export interface INewQuizcard {
  readonly type: "quiz";
  readonly quizType: "mc" | "tf" | "chk" | "blanks";
  question: string;
  answers: IQuizAnswer[];
  starred: boolean;
}

export interface IQuizcard extends INewQuizcard {
  readonly id: number;
  readonly packId: number;
}
