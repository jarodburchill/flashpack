import { IFlashcard, INewFlashcard } from "src/models/Flashcard";
import { IPack } from "src/models/Pack";
import { INewQuizcard, IQuizcard } from "src/models/Quizcard";
import { BaseDAL } from "./BaseDAL";

type Card = IFlashcard | IQuizcard;
type NewCard = INewFlashcard | INewQuizcard;

export class CardsDAL extends BaseDAL {
  private getCards(): Card[] {
    return this.electronStore.get("cards");
  }
  private setCards(cards: Card[]): void {
    this.electronStore.set("cards", cards);
  }
  public getPackCards<T extends Card>(pack: IPack): T[] {
    const cards: Card[] = this.getCards();
    const packCards: Card[] = cards.filter((card: Card) => {
      return card.packId === pack.id;
    });
    return packCards as T[];
  }
  public removePackCards(pack: IPack): void {
    const cards: Card[] = this.getCards();
    const remainingCards: Card[] = cards.filter((card: Card) => {
      return card.packId !== pack.id;
    });
    this.setCards(remainingCards);
  }
  public addCard(pack: IPack, newCard: NewCard): void {
    const cards: Card[] = this.getCards();
    const card: Card = {
      ...{ id: this.assignId(), packId: pack.id },
      ...newCard,
    };
    cards.push(card);
    this.setCards(cards);
  }
}
