import { IFlashcard } from "src/models/Flashcard";
import { IQuizcard } from "src/models/Quizcard";
import { BaseDAL } from "./BaseDAL";

export class CardsDAL extends BaseDAL {
  private getCards(): (IFlashcard | IQuizcard)[] {
    return this.electronStore.get("cards");
  }
  private setCards(cards: (IFlashcard | IQuizcard)[]): void {
    this.electronStore.set("cards", cards);
  }
}
