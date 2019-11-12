export interface IFlashcard {
  readonly id: number;
  readonly packId: number;
  term: string;
  definition: string;
  starred: boolean;
}
