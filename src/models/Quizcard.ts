export interface IQuizcard {
  id: number;
  packId: number;
  type: "mc" | "tf";
  question: string;
  answers: Array<{
    text: string;
    correct: boolean;
  }>;
  starred: boolean;
}
