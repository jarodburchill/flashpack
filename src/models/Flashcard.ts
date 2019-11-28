export interface INewFlashcard {
  readonly type: "flash";
  term: string;
  definition: string;
  starred: boolean;
}

export interface IFlashcard extends INewFlashcard {
  readonly id: number;
  readonly packId: number;
}
