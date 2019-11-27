export interface INewQuizcard {
  readonly type: "mc" | "tf" | "chk" | "blanks";
  question: string;
  answers: {
    text: string;
    correct: boolean;
  }[];
  starred: boolean;
}

export interface IQuizcard extends INewQuizcard {
  readonly id: number;
  readonly packId: number;
}
