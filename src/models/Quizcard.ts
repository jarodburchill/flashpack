export interface IQuizcard {
  readonly id: number;
  readonly packId: number;
  readonly type: "mc" | "tf" | "chk" | "blanks";
  question: string;
  answers: {
    text: string;
    correct: boolean;
  }[];
  starred: boolean;
}
