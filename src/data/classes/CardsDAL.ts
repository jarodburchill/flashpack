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
  private getPackCards<T extends Card>(pack: IPack): T[] {
    // TODO: handle pack not found
    const cards: Card[] = this.getCards();
    const packCards: Card[] = cards.filter((card: Card) => {
      return card.packId === pack.id;
    });
    return packCards as T[];
  }
  public getPackFlashcards(pack: IPack): IFlashcard[] {
    if (pack.type === "flash") {
      return this.getPackCards<IFlashcard>(pack);
    } else {
      throw new Error(
        "Pack was found, but it is a Quizcard Pack, not a Flashcard Pack."
      );
    }
  }
  public getPackQuizcards(pack: IPack): IQuizcard[] {
    if (pack.type === "quiz") {
      return this.getPackCards<IQuizcard>(pack);
    } else {
      throw new Error(
        "Pack was found, but it is a Falshcard Pack, not a Quizcard Pack."
      );
    }
  }
  public removePackCards(pack: IPack): void {
    // TODO: handle pack not found
    // TODO: move to PacksDAL remove function
    const cards: Card[] = this.getCards();
    const remainingCards: Card[] = cards.filter((card: Card) => {
      return card.packId !== pack.id;
    });
    this.setCards(remainingCards);
  }
  public addCard(pack: IPack, newCard: NewCard): void {
    // TODO: validate pack type
    const cards: Card[] = this.getCards();
    const card: Card = {
      ...{ id: this.assignId(), packId: pack.id },
      ...newCard,
    };
    cards.push(card);
    this.setCards(cards);
  }
  private getCard<T extends Card>(id: number): T {
    const cards: Card[] = this.getCards();
    const requestedCard: Card = cards.find((card: Card) => {
      return card.id === id;
    });
    if (requestedCard !== undefined) {
      return requestedCard as T;
    } else {
      throw new Error("Could not find matching Card ID.");
    }
  }
  public getFlashcard(id: number): IFlashcard {
    const card: IFlashcard = this.getCard<IFlashcard>(id);
    if (card.term !== undefined) {
      return card;
    } else {
      throw new Error("Card was found, but it is a Quizcard, not a Flashcard.");
    }
  }
  public getQuizcard(id: number): IQuizcard {
    const card: IQuizcard = this.getCard<IQuizcard>(id);
    if (card.question !== undefined) {
      return card;
    } else {
      throw new Error("Card was found, but it is a Falshcard, not a Quizcard.");
    }
  }
}
