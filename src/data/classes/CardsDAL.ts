import { IFlashcard } from "src/models/Flashcard";
import { IPack } from "src/models/Pack";
import { IQuizcard } from "src/models/Quizcard";
import { BaseDAL } from "./BaseDAL";

export class CardsDAL extends BaseDAL {
  private getCards(): (IFlashcard | IQuizcard)[] {
    return this.electronStore.get("cards");
  }
  private setCards(cards: (IFlashcard | IQuizcard)[]): void {
    this.electronStore.set("cards", cards);
  }
  public getPackCards<T extends IFlashcard | IQuizcard>(pack: IPack): T[] {
    const cards: (IFlashcard | IQuizcard)[] = this.getCards();
    const packCards: (IFlashcard | IQuizcard)[] = cards.filter(
      (card: IFlashcard | IQuizcard) => {
        return card.packId === pack.id;
      }
    );
    return packCards as T[];
  }
}
